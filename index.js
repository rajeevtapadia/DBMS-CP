import dotenv from "dotenv";
import express from "express";
import path from "path";
import connectDB from "./models/connection.js";
import router from "./router/router.js";
dotenv.config();

const app = express();
//setting up middleware
app.set("view engine", "ejs"); // EJS template engine
app.use(express.json()); // for JSON data
// OR
app.use(express.urlencoded({ extended: true })); //to access data from request bodies
app.use(express.static(path.join(path.resolve(), "public"))); //all css files and images will be in public folder

app.use(router);

connectDB().then(() => {
  app.listen(process.env.PORT, () => {
    console.log("server is up at ", process.env.PORT);
  });
});
