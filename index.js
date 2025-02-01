const express = require("express");
const dotenv = require("dotenv");
const userRouter = require("./routes/userRoutes");
const loanRouter = require("./routes/loanRoutes");
const morgan = require("morgan");
const mongoose = require("mongoose");

const app = express();

dotenv.config({ path: "./config.env" });

app.use(express.json());
app.use(morgan("dev"));

const port = process.env.port || 8300;
const DB = process.env.DATABASE.replace(
  "<db_password>",
  process.env.DATABASE_PASSWORD
);
console.log(DB);

mongoose
  .connect(DB, {
    useNewUrlParser: true,
  })
  .then(() => console.log("DB CONNECTION OK!"))
  .catch((err) =>
    console.error("MONGO ERROR: Error Connecting to Mongo Client")
  );

app.use("/api/v1/users", userRouter);
app.use("/api/v1/loans", loanRouter);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
