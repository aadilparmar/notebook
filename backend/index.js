const connectToMogo = require("./db");
connectToMogo();
const express = require("express");
const app = express();
var cors = require('cors')
app.use(cors())
const port = 5000;
app.use(express.json());
app.use("/api/auth", require("./routes/auth"));
app.use("/api/note", require("./routes/note"));
app.listen(port, () => {
  console.log(`NoteiT backend listening on port ${port}`);
});
