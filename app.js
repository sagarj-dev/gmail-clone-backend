const express = require("express");
const routes = require("./routes");
require("dotenv").config();
var cors = require("cors");
const app = express();

app.listen(process.env.PORT, () => {
  console.log("listening on port " + process.env.PORT);
});

app.use(
  cors({
    credentials: true,
    origin: true,
  })
);
app.use("/api", routes);

app.get("/", async (req, res) => {
  // const result=await sendMail();
  res.send("Welcome to Gmail API with NodeJS");
});
