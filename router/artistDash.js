import { Router } from "express";
import { connection } from "../index.js";

const artistDash = Router();

artistDash.get("/:id", async (req, res) => {
  const id = req.params.id;
  const [[artist]] = await connection.query(
    "SELECT * FROM artists WHERE id = ?",
    id
  );
  const [albums] = await connection.query(
    "SELECT * FROM albums WHERE artist_id = ?",
    id
  );
  const [allSongs] = await connection.query(
    `SELECT * from songs where artist_id = ?`,
    id
  );
  res.render("artist-dashboard.hbs", { albums, artist, allSongs });
});

// add a song to songs table
artistDash.post("/:id/song/add", (req, res) => {
  const { title, duration } = req.body;
  const { id } = req.params;

  connection
    .query(
      `INSERT INTO songs(title, duration, artist_id)
      VALUES (?, ?, ?)`,
      [title, duration, id]
    )
    .then(() => {
      res.redirect("../");
    });
});

// delete a song
artistDash.post("/:artistId/song/delete/:songId", (req, res) => {
  const { artistId, songId } = req.params;
  connection.query(`DELETE FROM songs WHERE id = ?`, songId).then(() => {
    res.redirect("../../");
  });
});

export default artistDash;
