import { Router } from "express";
import { connection } from "../index.js";

const dashRouter = Router();

// fetch logged in user's playlists
dashRouter.get("/:id", async (req, res) => {
  const id = req.params.id;
  const [[user]] = await connection.query(
    "SELECT * FROM users WHERE id = ?",
    id
  );
  const [playlists] = await connection.query(
    "SELECT * FROM playlists WHERE user_id = ?",
    id
  );
  res.render("dashboard.hbs", { playlists, user });
});

export default dashRouter;
