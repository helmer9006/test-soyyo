const express = require("express");
const cors = require("cors");
const { Constants } = require("./src/constants/constants");
// create server
const app = express();

// import connection
const { connection } = require("./src/database/db");

//allow reader the values of a body
app.use(express.json({ limit: "100mb" }));
app.use(express.urlencoded({ limit: "100mb", extended: true }));

//allow cors
app.use(cors());

// port app
const port = process.env.PORT || 4000;

// routers app
app.use("/api/user", require("./src/routes/user"));
app.use("/api/entities", require("./src/routes/entity"));

// init app
app.listen(port, "0.0.0.0", () => {
  console.log(`server running in port ${port}`);
  connection
    .sync({})
    .then(() => {
      console.log("Conected to db successfull");
    })
    .catch((err) => {
      if (err) {
        if (err.code === "PROTOCOL_CONNECTION_LOST") {
          console.error("Database connection was closed.");
        }
        if (err.code === "ER_CON_COUNT_ERROR") {
          console.error("Database has too many connections.");
        }
        if (err.code === "ECONNREFUSED") {
          console.error("Database connection was refused.");
        }
      }
    });
});
