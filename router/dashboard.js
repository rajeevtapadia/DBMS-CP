import { Router } from "express";
import { connection } from "../index.js";

const dashRouter = Router();
// search controllers
dashRouter.get("/search", (req, res) => {
  res.render("search-page.hbs");
});

dashRouter.post("/search", async (req, res) => {
  const { searchParam } = req.body;

  const [matches] = await connection.query(
    `SELECT songs.id, songs.title as songTitle, songs.duration, a.name, alb.title as albumTitle, alb.release_date FROM songs
    INNER JOIN artists AS a ON songs.artist_id = a.id
    LEFT JOIN albums as alb ON songs.album_id = alb.id
    WHERE songs.title LIKE CONCAT('%', ?, '%')`,
    searchParam
  );
  console.log({ matches });
  res.render("search-page.hbs", { matches });
});

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
