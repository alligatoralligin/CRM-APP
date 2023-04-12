const mongoose = require("mongoose");
const Contact = require("../Schemas/Contact");
const User = require("../Schemas/User");

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/CRMAPP");
  console.log("connected to mongodb");

  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}

main().catch((err) => console.log(err));

async function newContact() {
  await Contact.deleteMany({});
  createdContact = await Contact.create({
    name: "Jord Dane",
    title: "Retail",
    Email: "JordDane@gmail.com",
    phoneNumber: 456456555,
    Source: "unknown",
  });
  console.log(createdContact);
}

async function newContact2() {
  createdContact = await Contact.create({
    name: "Ceelo Green",
    title: "Data Entry",
    Email: "Ceelo@gmail.com",
    phoneNumber: 456456555,
    Source: "relatives",
  });
  console.log(createdContact);
}
async function newContact3() {
  createdContact = await Contact.create({
    name: "Sherry Jones",
    title: "Ceo",
    Email: "SherryJones@gmail.com",
    phoneNumber: 456456555,
    Source: "unknown",
  });
  console.log(createdContact);
}

async function newContact4() {
  createdContact = await Contact.create({
    name: "Sherry Jones",
    title: "Ceo",
    Email: "SherryJones@gmail.com",
    phoneNumber: 456456555,
    Source: "unknown",
  });
  //find User and push contact id to User as a reference that will be populated when needed
  updateUser = await User.findById("642746ecff410c2624a3ac32");
  updateUser.Contacts.push(createdContact._id);
  await updateUser.save();
}

newContact();
newContact2();
newContact3();
newContact4();
