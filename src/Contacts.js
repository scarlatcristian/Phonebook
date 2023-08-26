const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema({
  name: String,
  firstName: String,
  fullName: String,
  number: String,
  favorite: Boolean,
});

const Contacts = mongoose.model("Contacts", contactSchema);

module.exports = Contacts;
