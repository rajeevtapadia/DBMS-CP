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

  res.render("playlist.hbs", { songs, albumId, artistId });
});

// create an album
albumRouter.post("/:artistId/create", async (req, res) => {
  const artistId = req.params.artistId;
  const newAlbum = req.body.title;
  const releaseDate = req.body.release_date;

  connection.query(
    `INSERT INTO albums (title, release_date, artist_id) 
      VALUES (?, ?, ?)`,
    [newAlbum, releaseDate, artistId]
  );

  console.log("album created successfully", newAlbum);
  res.status(200).redirect(`/artist/dashboard/${artistId}`);
});

export default albumRouter;
