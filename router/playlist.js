import { Router } from "express";
import { connection } from "../index.js";

const playRouter = Router();

// fetch songs in a playlist
playRouter.get("/:userId/:playlistId", async (req, res) => {
  const { userId, playlistId } = req.params;

  const [songs] = await connection.query(
    `SELECT songs.id, songs.title as songTitle, songs.duration, art.name, alb.title as albumTitle
      FROM songs
      INNER JOIN playlist_songs 
      ON songs.id = playlist_songs.song_id
      LEFT JOIN artists as art on artist_id = art.id
      LEFT JOIN albums as alb on album_id = alb.id
      WHERE playlist_id = ?`,
    playlistId
  );

  res.render("playlist.hbs", { songs, playlistId, userId });
});

// create a playlist
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

// delete a playlist
playRouter.post("/:userId/delete/:playlistId", async (req, res) => {
  const { userId, playlistId } = req.params;

  connection
    .query("DELETE FROM playlist_songs WHERE playlist_id = ?", playlistId)
    .then(() => {
      connection
        .query("DELETE FROM playlists WHERE id = ?", playlistId)
        .then(() => {
          console.log("playlist deleted successfully");
          res.status(200).redirect(`/dashboard/${userId}`);
        });
    });
});

// add a song to a playlist
playRouter.post("/:userId/add/:playlistId", (req, res) => {
  const { userId, playlistId } = req.params;
  const songId = req.body.songId;

  connection
    .query(
      `INSERT INTO playlist_songs (playlist_id, song_id) 
        VALUES (?, ?)`,
      [playlistId, songId]
    )
    .then(() => {
      res.redirect(`/playlists/${userId}/${playlistId}`);
    });
});

// delete a single song from a playlist
playRouter.post("/:userId/deletesong/:playlistId/:songId", async (req, res) => {
  const { userId, playlistId, songId } = req.params;

  connection
    .query(
      `DELETE FROM playlist_songs 
        WHERE song_id= ? AND playlist_id = ?`,
      [songId, playlistId]
    )
    .then(() => {
      res.redirect(`/playlists/${userId}/${playlistId}`);
    });
});

export default playRouter;
