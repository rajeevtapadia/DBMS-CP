import { Router } from "express";

const router = Router();

router.get("/", (req, res) => {
    res.render("homepage.ejs")
})

router.get("/auth/login", (req, res) => {
    res.render("login.ejs")
})

router.get("/auth/signup", (req, res) => {
    res.render("signup.ejs")
})

router.get("/dashboard", (req, res) => {
    res.render("dashboard.ejs")
})

export default router;