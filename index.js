import dotenv from "dotenv";
import express from "express";
import path from "path";
import router from "./router/router.js";
import mysql from "mysql2/promise"
dotenv.config();

const app = express();
//setting up middleware
app.set("view engine", "ejs"); // EJS template engine
// app.use(express.json()); // for JSON data
// OR
app.use(express.urlencoded({ extended: true })); //to access data from request bodies
app.use(express.static(path.join(path.resolve(), "public"))); //all css files and images will be in public folder

app.use(router);

let connection;

try {
  const config = {
    host: process.env.HOST,
    user: process.env.MYSQL_USERNAME,
    password: process.env.MYSQL_PASS,
      database: process.env.DB_NAME,
  };
  connection = await mysql.createConnection(config);
  console.log("Connected to the MySQL database!");
  app.listen(process.env.PORT, () => {
    console.log("server is up at ", process.env.PORT);
  });
} catch (error) {
  console.error("Error connecting to the MySQL database:", error);
}

export { connection };
