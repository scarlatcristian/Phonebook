const express = require("express");
const cors = require("cors");
const app = express();

// Enable CORS
app.use(cors());

// Parse JSON requests
app.use(express.json());

// Define a route for the root path ("/")
app.get("/", (req, res) => {
  res.json({
    status: "success",
    message: "Welcome to the Phonebook API!",
  });
});

// Start the server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
