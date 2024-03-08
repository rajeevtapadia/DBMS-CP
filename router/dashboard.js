import { Router } from "express";
import { connection } from "../index.js";

const dashRouter = Router();

dashRouter.get("/:id", async (req, res) => {
  console.log(req.params.id);
  const id = req.params.id;
  const [[user]] = await connection.query(
    "SELECT * FROM users WHERE id = ?",
    id
  );
  const [playlists] = await connection.query(
    "SELECT * FROM playlists WHERE user_id=?",
    id
  );
  console.log(user);
  res.render("dashboard.hbs", { playlists, user });
});

dashRouter.get("/playlists", (req, res) => {
  res.render("dashboard.hbs");
});

dashRouter.get("/playlists/:id", async (req, res) => {
  const playlistId = req.params.id;
  const [songs] = await connection.query(
    `SELECT * FROM songs INNER JOIN playlist_songs 
    ON songs.id = playlist_songs.song_id 
    WHERE playlist_id = ?`,
    playlistId
  );
  console.log(songs);
  res.render("playlist.hbs", { songs });
});

export default dashRouter;
