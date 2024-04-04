// const { user } = require("../model/user");
const dotenv = require("dotenv").config();
const jwt = require("jsonwebtoken");
const { User } = require("../model/user");

const createToken = (user) => {
  jwt.sign({ _id: user._id, isAdmin: user.isAdmin }, process.env.SECRET, {
    expiresIn: "3d",
  });
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.login(email, password);
    const token = createToken(user._id);
    res.status(200).json({ email, token });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }

  //   res.json({ login: "user loged in" });
};

const signUpUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.signup(email, password);
    const token = createToken(user._id);
    res.status(200).json({ email, token });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }

  //   res.json({ signup: "user created" });
};

module.exports = {
  loginUser,
  signUpUser,
};
