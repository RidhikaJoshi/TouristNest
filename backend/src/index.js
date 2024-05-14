// require("dotenv").config({ path: "./env" });
// it does not maintain consistency for import statement
import dotenv from "dotenv";
import connectDB from "./db/index.js";
import app from "./app.js";

dotenv.config();
connectDB()
  .then(() => {
    app.on("error", (error) => {
      // using arrow function to catch error occured in connecting express and database
      console.log("Error occured in server", error);
      throw error;
    });
    app.listen(process.env.PORT || 8000, () => {
      console.log(`Server is running on port ${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.log("Error occured in connecting to database", err);
  });
