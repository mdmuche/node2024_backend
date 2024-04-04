const express = require("express");

const { loginUser, signUpUser } = require("../controllers/authControllers");

const authRouter = express.Router();

authRouter.post("/login", loginUser);

authRouter.post("/signup", signUpUser);

module.exports = { authRouter };
