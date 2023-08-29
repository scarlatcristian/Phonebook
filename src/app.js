const express = require("express");
const path = require("path");
const connectToDatabase = require("./mongodb");
const Contacts = require("./Contacts");

// Call the database connection function
connectToDatabase();

const app = express();
app.use(express.json());

const frontendDirectoryPath = path.join(__dirname, "../frontend");

// Serve Frontend
app.use(express.static(frontendDirectoryPath));

app.get("", (req, res) => {
  res.render("index");
});

app.get("/contacts", async (req, res) => {
  try {
    const contacts = await Contacts.find();
    res.json(contacts);
  } catch (error) {
    console.error("Error retrieving contacts:", error);
    res
      .status(500)
      .json({ error: "An error occurred while retrieving contacts" });
  }
});

app.post("/add-contact", async (req, res) => {
  try {
    const newContact = req.body;
    const contact = await Contacts.create(newContact);
    res.status(201).json(contact);
  } catch (error) {
    console.error("Error adding contact:", error);
    res
      .status(500)
      .json({ error: "An error occurred while adding the contact" });
  }
});

app.delete("/delete-contact", async (req, res) => {
  try {
    const contact = req.body;
    const deletedContact = await Contacts.findByIdAndDelete(contact._id);

    if (!deletedContact) {
      return res.status(404).json({ error: "Contact not found" });
    }

    res.status(200).json(deletedContact);
  } catch (error) {
    console.error("Error deleting contact:", error);
    res
      .status(500)
      .json({ error: "An error occurred while deleting the contact" });
  }
});

app.put("/update-contact", async (req, res) => {
  try {
    const updatedContact = req.body;
    const updatedDocument = await Contacts.findByIdAndUpdate(
      updatedContact._id,
      updatedContact
    );

    if (!updatedDocument) {
      return res.status(404).json({ error: "Contact not found" });
    }

    res.status(200).json(updatedDocument);
  } catch (error) {
    console.error("Error updating contact:", error);
    res
      .status(500)
      .json({ error: "An error occurred while updating the contact" });
  }
});

// Start the server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
