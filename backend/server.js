// Express Declarations
const express = require("express");
const bodyParser = require("body-parser");

const cors = require("cors");
const app = express();
const port = 8000;

//Mongoose Declarations
const Contact = require("./Schemas/Contact");
const SaleGroup = require("./Schemas/SalesGroup");
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

  res.json({ info: showPageData });
});

app.post("/register-user", async (req, res, next) => {
  // finding groupId based on groupname
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
      res.json({
        session: req.session.isLoggedIn,
        id: result.id,
        username: result.username,
      });
    }
  });
});

app.get("/get-client-by-id/:id", async (req, res) => {
  const findClientbyId = await Contact.findById(req.params.id);
  res.json({ ClientInfo: findClientbyId });
  console.log(findClientbyId);
});
app.post("/create-new-client/:id", async (req, res) => {
  const createNewClient = await Contact.create({
    name: req.body.name,
    title: req.body.title,
    Email: req.body.email,
    phoneNumber: req.body.phoneNumber,
    Source: req.body.Source,
    User: req.params.id,
  });
  // const addIds = await Contact.updateOne(
  //   { id: createNewClient._id },
  //   { AssignedSales: req.params.id }
  // );
  // await createNewClient.save();
  const foundUser = await User.findById(req.params.id);
  foundUser.Contacts.push(createNewClient._id);
  await foundUser.save();
  const updatedContactList = await User.findById(req.params.id).populate(
    "Contacts"
  );
  console.log(req.query);
  console.log(req.body);
  console.log(createNewClient);
  console.log("contact created");
  res.json({ newContactList: updatedContactList });
});

app.post("/create-group/:id", async (req, res) => {
  // create a new group using the name from the form data
  //using information from req.params.id assign the owner ID
  const createNewGroup = await SaleGroup.create({
    name: req.body.groupname,
    ownerID: req.params.id,
  });
  createNewGroup.save();
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
  const updatedShowPageData = await User.findById(req.params.UserId).populate(
    "Contacts"
  );
  //updated show page data to refresh the client page when a client is deleted
  console.log(updatedShowPageData);
  console.log(deletedClient);
  res.json({ updatedClientList: updatedShowPageData });
});
app.post("/update-client/:id", async (req, res) => {
  const updateClient = await Contact.updateOne(
    {
      _id: `${req.params.id}`,
    },
    req.body
  );
  console.log(updateClient);
  console.log("Client Updated");
});

// update route

app.post("/update-client-info:id", async (req, res) => {
  console.log(req.params.id);
});

app.get("/dashboard/:UserID", async (req, res) => {
  const groupById = await SaleGroup.findOne({
    ownerID: req.params.UserID,
  }).populate("Users");
  const aggregateResp = await User.aggregate([
    { $match: { GroupID: groupById.id } },
    {
      $project: {
        Contacts: 1,
      },
    },
  ]);

  const populatedContacts = await User.populate(aggregateResp, {
    path: "Contacts",
  });
  console.log(populatedContacts);
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
