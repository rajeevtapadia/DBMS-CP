import { Router } from "express";
import { connection } from "../index.js";

const artistDash = Router();

artistDash.get("/:id", (req, res) => {
  res.render("artist-dashboard.hbs");
});

export default artistDash;
