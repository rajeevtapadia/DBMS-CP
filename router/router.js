import { Router } from "express";
import { connection } from "../index.js";

const router = Router();

router.get("/", (req, res) => {
  res.render("homepage.ejs");
});

router.get("/auth/login", (req, res) => {
  res.render("login.ejs");
});

router.post("/auth/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    const results = await connection.query(
      "SELECT * FROM users WHERE username = ? AND password = ?",
      [username, password]
    );
    console.log(results[0][0].id);

    if (results.length === 0) {
      res.status(401).send("Invalid credentials");
    } else {
      //   req.session.user = results[0];
      //   res.send("Login success");
      res.redirect(`/dashboard/${results[0][0].id}`);
    }
  } catch (error) {
    res.status(500).send("Internal Server Error");
    console.log(error);
  }
});

router.get("/auth/signup", (req, res) => {
  res.render("signup.ejs");
});

router.post("/auth/signup", (req, res) => {
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
  res.redirect("/auth/login");
});

router.get("/dashboard/:id", (req, res) => {
  console.log(req.params.id);
  res.render("dashboard.ejs");
});

router.get("/dashboard/playlists", (req, res) => {
  res.render("dashboard.ejs");
});

router.get("/dashboard/playlists/:id", (req, res) => {
  res.render("dashboard.ejs");
});

export default router;
