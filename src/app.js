const express = require("express");
const path = require("path");
const app = express();

// Serve Frontend
const frontendDirectoryPath = path.join(__dirname, "../frontend");
app.use(express.static(frontendDirectoryPath));

console.log(frontendDirectoryPath);

// Start the server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
