// Express Declarations
const express = require("express");
const bodyParser = require("body-parser");

const cors = require("cors");
const app = express();
const port = 8000;

//Mongoose Declarations
const Contact = require("./Schemas/Contact");
const SaleGroup = require("./Schemas/SalesGroup");
const Product = require("./Schemas/Product");
const mongoose = require("mongoose");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const User = require("./Schemas/User");

//express-session declaration

const session = require("express-session");

//App.use
app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["POST", "PUT", "GET", "OPTIONS", "HEAD", "DELETE"],
    credentials: true,
  })
);
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
//express-session initialization
app.set("trust proxy", 1);
app.use(
  session({
    secret: "keyboard cat",
    proxy: true,
    resave: true,
    saveUninitialized: false,
    cookie: {
      httpOnly: false,
      maxAge: 1000 * 60 * 60 * 24 * 7,
      secure: false,
    },
  })
);
app.use(passport.session());
//Passport Strategy and static functions
passport.use(new LocalStrategy(User.authenticate));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//Checking if user is logged in
async function isLoggedIn(req, res, next) {
  if (req.session.isLoggedIn) {
    console.log("Hello you are logged in ");
  } else {
    console.log(req.session.isLoggedIn);
    console.log("You are not logged in");
    return next();
  }
}
//Connecting to MongoDB
async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/CRMAPP");
  console.log("connected to mongodb");

  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}

main().catch((err) => console.log(err));

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/message", (req, res) => {
  res.json({ message: "Hello from server" });
});

app.get("/entry", async (req, res) => {
  const data = await Contact.find({ name: "Joe Dan" });
  res.json({ info: data });
});

app.get("/showpage/:id", isLoggedIn, async (req, res) => {
  const showPageData = await User.findById(req.params.id).populate("Contacts");
  const groupInfo = await User.findById(req.params.id).populate("GroupID");
  // console.log(groupInfo);
  res.json({ info: showPageData, groupInfo: groupInfo.GroupID });
});

app.post("/register-user", async (req, res, next) => {
  // finding groupId based on groupname
  if (req.body.salegroup) {
    const groupFind = await SaleGroup.findOne({ name: req.body.salegroup });
    const registerUser = await User.register(
      new User({
        username: req.body.username,
        password: req.body.password,
        Email: req.body.Email,
        GroupID: groupFind._id,
      }),
      req.body.password
    );
    groupFind.Users.push(registerUser.id);
    groupFind.save();
    console.log(req.body.salegroup);
    res.json({ registeredID: registerUser.id });
  }
  if (!req.body.salegroup) {
    const registerUser = await User.register(
      new User({
        username: req.body.username,
        password: req.body.password,
        Email: req.body.Email,
      }),
      req.body.password
    );
    res.json({ registeredID: registerUser.id });
  }
});

app.post("/login", async (req, res, next) => {
  const authenticate = User.authenticate();

  authenticate(req.body.Username, req.body.Password, function (err, result) {
    if (result == false) {
      console.log("incorrect username or password");
      console.log(err);
    } else {
      req.session.isLoggedIn = true;
      console.log("you have logged in");
      console.log(req.session.isLoggedIn);
      console.log(result);

      if (result.GroupID) {
        res.json({
          session: req.session.isLoggedIn,
          id: result.id,
          username: result.username,
          GroupIDs: result.GroupID,
        });
      }
      if (!result.GroupID) {
        res.json({
          session: req.session.isLoggedIn,
          id: result.id,
          username: result.username,
        });
      }
    }
  });
});

app.get("/get-client-by-id/:id", async (req, res) => {
  const findClientbyId = await Contact.findById(req.params.id);
  res.json({ ClientInfo: findClientbyId });
  // console.log(findClientbyId);
});
app.post("/create-new-client/:id", async (req, res) => {
  const createNewClient = await Contact.create({
    name: req.body.name,
    title: req.body.title,
    Email: req.body.Email,
    phoneNumber: req.body.phoneNumber,
    Source: req.body.Source,
    Notes: req.body.Notes,
    User: req.params.id,
    AssignedGroup: req.body.GroupName,
    ContactStatus: req.body.ContactStatus,
  });
  // const addIds = await Contact.updateOne(
  //   { id: createNewClient._id },
  //   { AssignedSales: req.params.id }
  // );
  // await createNewClient.save();
  const foundUser = await User.findById(req.params.id);
  foundUser.Contacts.push(createNewClient);
  // foundUser.ContactsID.push(createNewClient._id);
  //Instead of storing ID, I will store the entire contact information so that I don't have to populate after
  await foundUser.save();
  const updatedContactList = await User.findById(req.params.id).populate(
    "Contacts"
  );
  // console.log(req.query);
  // console.log(req.body);
  // console.log(createNewClient);
  console.log("contact created");
  console.log(createNewClient);
  res.json({ newContactList: updatedContactList });
});

app.get("/product-page/:id", async (req, res) => {
  const findGroups = await SaleGroup.find({ ownerID: req.params.id }).populate(
    "Products"
  );
  res.json({ SaleGroupList: findGroups });
});
app.post("/create-new-product/:id", async (req, res) => {
  const findGroup = await SaleGroup.findOne({ _id: req.body.GroupName });
  const newProduct = await Product.create({
    name: req.body.name,
    price: req.body.price,
    description: req.body.description,
    Img: req.body.Img,
    SalesID: req.params.id,
    GroupID: req.body.GroupName,
  });
  findGroup.Products.push(newProduct._id);
  findGroup.save();
  const findAllGroups = await SaleGroup.find({
    ownerID: req.params.id,
  }).populate("Products");
  console.log(newProduct);
  console.log(findGroup);
  res.json({ newRespGroup: findAllGroups });
});

app.get("/edit-product/:id", async (req, res) => {
  const findProduct = await Product.findOne({ _id: req.params.id });

  res.json({ productDataResp: findProduct });
});
app.post("/update-product/:productID", async (req, res) => {
  const updateProduct = await Product.updateOne(
    {
      _id: `${req.params.productID}`,
    },
    req.body
  );
  console.log(updateProduct);
  console.log("Product Updated");
});

app.delete("/delete-product/:UserID/:ProductID", async (req, res) => {
  //find Group by ID
  const removeFromGroup = await SaleGroup.findOneAndUpdate(
    { ownerID: req.params.UserID },
    { $pull: { Products: req.params.ProductID } },
    { new: true }
  );
  const deleteProduct = await Product.deleteOne({ _id: req.params.ProductID });
  const findAllGroups = await SaleGroup.find({
    ownerID: req.params.UserID,
  }).populate("Products");
  console.log(deleteProduct);
  console.log(removeFromGroup);
  res.json({ deleteResp: findAllGroups });
});
app.post("/create-group/:id", async (req, res) => {
  // create a new group using the name from the form data
  //using information from req.params.id assign the owner ID for the group
  const createNewGroup = await SaleGroup.create({
    name: req.body.groupname,
    ownerID: req.params.id,
  });
  createNewGroup.save();
  //need to add group to array of groupid in case there is more than one ID
  const addGroupIDtoUser = await User.findOne({ id: req.body.id });
  addGroupIDtoUser.GroupID.push(createNewGroup._id);
  addGroupIDtoUser.save();
  console.log(addGroupIDtoUser);
  console.log(createNewGroup);
  console.log(req.body);
  res.send("Group created");
});

app.get("/group-page/:id", async (req, res) => {
  const getGroupInfo = await SaleGroup.find({
    ownerID: req.params.id,
  }).populate("Users");
  res.json({ GroupInfo: getGroupInfo });
  console.log(getGroupInfo);
  console.log("Group information found");
});

app.post("/add-to-group", async (req, res) => {
  const findGroupId = await SaleGroup.findOne({ _id: req.body.GroupName });
  const findUserId = await User.findOne({ Email: req.body.Email });
  const addGroupIdToUser = await User.findOneAndUpdate(
    { Email: req.body.Email },
    { GroupID: findGroupId.id }
  );
  //add group to user list (not completed)
  findGroupId.Users.push(findUserId._id);
  await findGroupId.save();
  //need to add logic so that no duplicate ids are added.
  res.send("you have reached group adding feature");
  console.log("added to group");
  console.log(addGroupIdToUser);
  console.log(findGroupId);
});

app.delete("/remove-from-group/:ownerID/:groupID/:userID", async (req, res) => {
  const findGroupId = await SaleGroup.updateOne(
    { _id: req.params.groupID },
    { $pull: { Users: req.params.userID } }
  );
  const findNewGroup = await SaleGroup.find({
    ownerID: req.params.ownerID,
  }).populate("Users");
  findGroupId.Users;
  res.json({ newGroupInfo: findNewGroup });
});
app.delete("/delete-client/:UserId/:clientid", async (req, res) => {
  const deletedClient = await Contact.deleteOne({ _id: req.params.clientid });
  const removeClient = await User.updateOne(
    { _id: req.params.UserId },
    {
      $pull: {
        Contacts: { _id: new mongoose.Types.ObjectId(req.params.clientid) },
      },
    },
    { new: true }
  );
  //* Issue was finding mongoose Object _id with req.params.clientid which was a string
  const updatedShowPageData = await User.findById(req.params.UserId).populate(
    "Contacts"
  );
  //updated show page data to refresh the client page when a client is deleted
  // console.log(req.params.clientid);
  // console.log(updatedShowPageData);
  // console.log(removeClient);
  // console.log(typeof req.params.UserId);
  // console.log(req.params.clientid);

  res.json({ updatedClientList: updatedShowPageData });
});
app.post("/update-client/:id/:UserID", async (req, res) => {
  const updateClient = await Contact.updateOne(
    {
      _id: `${req.params.id}`,
    },
    req.body
  );
  //*******Need to update the client that is stored on the User's contact array
  const updateUser = await User.updateOne(
    {
      _id: `${req.params.UserID}`,
      "Contacts._id": new mongoose.Types.ObjectId(req.params.id),
    },
    {
      $set: {
        "Contacts.$.name": req.body.name,
        "Contacts.$.title": req.body.title,
        "Contacts.$.Email": req.body.Email,
        "Contacts.$.phoneNumber": req.body.phoneNumber,
        "Contacts.$.Source": req.body.Source,
        "Contacts.$.Notes": req.body.Notes,
      },
    }
  );

  console.log(updateUser);
  // console.log(updateClient);
  // console.log(req.body);
  console.log("Client Updated");
});

// update route

app.post("/update-client-info:id", async (req, res) => {
  console.log(req.params.id);
});

app.get("/dashboard/:UserID", async (req, res) => {
  //Counting all the documents in Contacts of group
  const groupById = await SaleGroup.find({
    ownerID: req.params.UserID,
  }).populate("Users");
  //Total Client Number
  if (groupById[0]) {
    const aggregateResp = await User.aggregate([
      { $match: { GroupID: groupById[0]._id } },
      { $group: { _id: "$Contacts" } },
      { $count: "Contacts" },
    ]);
    //Clients per User
    const userByGroupID = await User.find({ GroupID: groupById[0]._id }).select(
      {
        username: 1,
        Contacts: 1,
      }
    );

    console.log(userByGroupID);
    const populatedContacts = await User.populate(aggregateResp, {
      path: "Contacts",
    });
    // console.log(groupById);
    // console.log(populatedContacts);
    console.log(aggregateResp);
    console.log(groupById);
    res.json({
      groupContacts: aggregateResp,
      userByGroupID: userByGroupID,
      contacts: populatedContacts,
    });
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
