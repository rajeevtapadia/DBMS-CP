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

export default albumRouter;
