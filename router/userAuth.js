import { Router } from "express";
import { connection } from "../index.js";

const userAuth = Router();

userAuth.get("/login", (req, res) => {
  res.render("user-login.hbs");
});

userAuth.post("/login", async (req, res) => {
  console.log(req.body);
  const { username, password } = req.body;
  try {
    const results = await connection.query(
      "SELECT * FROM users WHERE username = ? AND password = ?",
      [username, password]
    );

    if (results[0].length === 0) {
      res.status(401).send("Invalid credentials");
    } else {
      res.redirect(`/dashboard/${results[0][0].id}`);
    }
  } catch (error) {
    res.status(500).send("Internal Server Error");
    console.log(error);
  }
});

userAuth.get("/signup", (req, res) => {
  res.render("user-signup.hbs");
});

userAuth.post("/signup", (req, res) => {
  const { username, password, email } = req.body;

  connection.query(
    "INSERT INTO users (username, password, email) VALUES (?, ?, ?)",
    [username, password, email],
    (error) => {
      if (error) {
        res.status(500).send("Internal Server Error");
      } else {
        res.send("Signup success");
      }
    }
  );

  res.redirect("/auth/user/login");
});

export default userAuth;
