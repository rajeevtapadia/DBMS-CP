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
  res.render("artist-dashboard.hbs", {albums, artist});
});

export default artistDash;
