import { Router } from "express";
import { connection } from "../index.js";

const playRouter = Router();

playRouter.get("/:userId/:playlistId", async (req, res) => {
  const { userId, playlistId } = req.params;

  //   todo: join artist table
  const [songs] = await connection.query(
    `SELECT * FROM songs INNER JOIN playlist_songs 
      ON songs.id = playlist_songs.song_id 
      WHERE playlist_id = ?`,
    playlistId
  );

  res.render("playlist.hbs", { songs });
});

playRouter.post("/:userId/create", async (req, res) => {
  const userId = req.params.userId;
  const newPlaylist = req.body.name;

  connection.query(`INSERT INTO playlists (name, user_id) VALUES (?, ?)`, [
    newPlaylist,
    userId,
  ]);

  console.log("playlist created successfully");
  res.status(200).redirect(`/dashboard/${userId}`);
});



export default playRouter;
