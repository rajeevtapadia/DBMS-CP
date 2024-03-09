import { Router } from "express";
import { connection } from "../index.js";

const artistAuth = Router();

artistAuth.get("/login", (req, res) => {
  res.render("artist-login.hbs");
});

artistAuth.post("/login", async (req, res) => {
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
      // todo change
      res.redirect(`/dashboard/${results[0][0].id}`);
    }
  } catch (error) {
    res.status(500).send("Internal Server Error");
    console.log(error);
  }
});

artistAuth.get("/signup", (req, res) => {
  res.render("artist-signup.hbs");
});

artistAuth.post("/signup", (req, res) => {
  const { username, password, email } = req.body;

  connection.query(
    "INSERT INTO artists (name, password, email) VALUES (?, ?, ?)",
    [username, password, email],
    (error) => {
      if (error) {
        res.status(500).send("Internal Server Error");
      } else {
        res.status(200).redirect("/auth/artist/login");
      }
    }
  );
});

export default artistAuth;
