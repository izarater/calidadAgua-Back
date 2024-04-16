const express = require("express");
const conectarDB = require("./database");
const cors = require("cors");
const app = express();
require("dotenv").config();

const PORT = process.env.PORT || 4000;

conectarDB();
app.use(express.json()); //body parser
const whitelist = ["http://localhost:3000", "https://smartwater.vercel.app/"];
const options = {
  origin: (origin, callback) => {
    if (whitelist.includes(origin) || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed."));
    }
  },
};
app.use(cors(options));

app.use("/api/auth", require("./routes/auth"));
app.use("/api/user", require("./routes/user"));
app.use("/api/waterresources", require("./routes/waterResources"));

app.listen(PORT, () => {
  console.log(`Listening http://localhost:${4000}`);
});
