import { Router } from "express";
import { connection } from "../index.js";

const authRouter = Router();

authRouter.get("/login", (req, res) => {
  res.render("login.hbs");
});

authRouter.post("/login", async (req, res) => {
  console.log(req.body);
  const { username, password } = req.body;
  try {
    const results = await connection.query(
      "SELECT * FROM users WHERE username = ? AND password = ?",
      [username, password]
    );
    console.log(results);

    if (results[0].length === 0) {
      res.status(401).send("Invalid credentials");
    } else {
      // console.log(results[0][0].id);
      //   req.session.user = results[0];
      //   res.send("Login success");
      res.redirect(`/dashboard/${results[0][0].id}`);
    }
  } catch (error) {
    res.status(500).send("Internal Server Error");
    console.log(error);
  }
});

authRouter.get("/signup", (req, res) => {
  res.render("signup.hbs");
});

authRouter.post("/signup", (req, res) => {
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
  //   res.send("Signup success");
  res.redirect("/login");
});

export default authRouter;
