const express = require("express");
const userModel = require("../models/user.model");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

const authRouter = express.Router();

authRouter.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  const isUserAlreadyExists = await userModel.findOne({ email });

  if (isUserAlreadyExists) {
    return res.status(409).json({
      message: "User Already exists with this email",
    });
  }

  const user = await userModel.create({
    name,
    email,
    password: crypto.createHash("sha256").update(password).digest("hex"),
  });

  const token = jwt.sign(
    {
      id: user._id,
      email: user.email,
    },
    process.env.JWT_SECRET,
  );

  res.cookie("jwt_token", token);
  res.status(201).json({
    message: "user registrated",
    user,
    token,
  });
});

/**
 * async (req,res) this type of callback are also called as controller
 * means that api runs when these api pe req ati h
 */
authRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const user = await userModel.findOne({ email });
  if (!user) {
    return res.status(404).json({
      message: "User not found with this email",
    });
  }

  const hash = crypto.createHash("sha256").update(password).digest("hex");
  const isPassValid = hash == user.password;
  if (!isPassValid) {
    return res.status(401).json({
      message: "Invalid password",
    });
  }
  const token = jwt.sign(
    {
      id: user._id,
    },
    process.env.JWT_SECRET,
  );

  res.cookie("jwt_token", token);

  res.status(200).json({
    message: "User logged in",
    user,
  });
});

module.exports = authRouter;
