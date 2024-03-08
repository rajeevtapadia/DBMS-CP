import { Router } from "express";
import { connection } from "../index.js";

const dashRouter = Router();

dashRouter.get("/:id", (req, res) => {
  console.log(req.params.id);
  res.render("dashboard.hbs");
});

dashRouter.get("/playlists", (req, res) => {
  res.render("dashboard.hbs");
});

dashRouter.get("/playlists/:id", (req, res) => {
  res.render("dashboard.hbs");
});

export default dashRouter;
