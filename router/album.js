import { Router } from "express";
import { connection } from "../index.js";

const albumRouter = Router();

// fetch songs in a album
albumRouter.get("/:artistId/:albumId", async (req, res) => {
  const { artistId, albumId } = req.params;

  //   todo: join artist table
  const [songs] = await connection.query(
    `SELECT * FROM songs
      WHERE album_id = ?`,
    albumId
  );
  console.log(songs);

  res.render("albums.hbs", { songs, albumId, artistId });
});

// create an album
albumRouter.post("/:artistId/create", async (req, res) => {
  const artistId = req.params.artistId;
  const newAlbum = req.body.title;
  const releaseDate = req.body.release_date;

  connection
    .query(
      `INSERT INTO albums (title, release_date, artist_id) 
      VALUES (?, ?, ?)`,
      [newAlbum, releaseDate, artistId]
    )
    .then(() => {
      console.log("album created successfully", newAlbum);
      res.status(200).redirect(`/artist/dashboard/${artistId}`);
    });
});

// delete a album
albumRouter.post("/:artistId/delete/:albumId", async (req, res) => {
  const { artistId, albumId } = req.params;

  connection.query("DELETE FROM albums WHERE id = ?", albumId).then(() => {
    console.log("album deleted successfully");
    res.status(200).redirect(`/artist/dashboard/${artistId}`);
  });
});

// add a song to a album
albumRouter.post("/:artistId/add/:albumId", (req, res) => {
  const { artistId, albumId } = req.params;
  const songId = req.body.songId;

  connection
    .query(
      `UPDATE songs SET album_id = ?
        WHERE id = ?`,
      [albumId, songId]
    )
    .then(() => {
      res.redirect(`/album/${artistId}/${albumId}`);
    });
});

// delete a single song from a playlist
albumRouter.post("/:artistId/deletesong/:albumId/:songId", async (req, res) => {
  const { artistId, albumId, songId } = req.params;

  connection
    .query(
      `UPDATE songs SET album_id = NULL
        WHERE id = ?`,
      songId
    )
    .then(() => {
      res.redirect(`/album/${artistId}/${albumId}`);
    });
});

export default albumRouter;
