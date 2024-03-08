import { Router } from "express";
import { connection } from "../index.js";

const router = Router();

router.get("/", (req, res) => {
  res.render("homepage.hbs");
});

export default router;
