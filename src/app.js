const express = require("express");
const path = require("path");
const connectToDatabase = require("./mongodb");
const Contacts = require("./Contacts");

// Call the database connection function
connectToDatabase();

const app = express();
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

// Start the server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
