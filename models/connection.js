import mysql from "mysql2/promise";
import dotenv from "dotenv";
dotenv.config();

console.log(process.env.HOST);

export default async function connectDB() {
  try {
    const config = {
      host: process.env.HOST,
      user: process.env.MYSQL_USERNAME,
      password: process.env.MYSQL_PASS,
    //   database: process.env.DB_NAME,
    };
    const connection = await mysql.createConnection(config);
    console.log("Connected to the MySQL database!");
    return connection;
  } catch (error) {
    console.error("Error connecting to the MySQL database:", error);
  }
}
