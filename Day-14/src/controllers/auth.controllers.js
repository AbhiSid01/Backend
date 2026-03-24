const userModel = require("../models/user.model");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");
async function registerController(req, res) {
  const { email, username, password, bio, profileImage } = req.body;

  //our email and usernam eshould be unique
  // const isUserExistsByEmail = await userModel.findOne({email})

  // if(isUserExistsByEmail){
  //     return res.status(409).json({
  //         message:"User already exists with same email"
  //     })
  // }
  // const isUserExistsByUsername = await userModel.findOne({username})

  // if(isUserExistsByUsername){
  //     return res.status(409).json({
  //         message:"User already exists with by userName "
  //     })
  // }
  /**
   * the above code will work fine but it is not efficient
   */

  const isUserAlreadyExists = await userModel.findOne({
    $or: [{ username }, { email }],
  });

  if (isUserAlreadyExists) {
    return res.status(409).json({
      message:
        "User Already Exists" +
        (isUserAlreadyExists.email == email
          ? "Email already exists"
          : "Username already exists"),
    });
  }

  const hash = crypto.createHash("sha256").update(password).digest("hex");

  const user = await userModel.create({
    username,
    email,
    bio,
    profileImage,
    password: hash,
  });

  /**
   * user ka data hona chaiye
   * data unique hona chaiye
   */

  const token = jwt.sign(
    {
      id: user._id,
    },
    process.env.JWT_SECRET,
    { expiresIn: "1d" },
  );

  res.cookie("token", token);

  res.status(201).json({
    message: "User registerd Successfully",
    user: {
      email: user.email,
      username: user.username,
      bio: user.bio,
      profileImage: user.profileImage,
    },
  });
}

async function loginController(req, res) {
  const { username, email, password } = req.body;

  /**
   * eith by username + password
   *      or
   * email + password
   */

  const user = await userModel.findOne({
    $or: [
      {
        //condition
        username: username,
      },
      {
        //condition
        email: email,
      },
    ],
  });

  if (!user) {
    return res.status(404).json({
      message: "User not found",
    });
  }

  const hash = crypto.createHash("sha256").update(password).digest("hex");

  const isPasswordValid = hash == user.password;

  if (!isPasswordValid) {
    return res.status(401).json({
      message: "Password Invalid",
    });
  }

  const token = jwt.sign(
    {
      id: user._id,
    },
    process.env.JWT_SECRET,
    { expiresIn: "1d" },
  );

  res.cookie("token", token);

  res.status(200).json({
    message: "User loggedIn Successfully",
    user: {
      username: user.username,
      email: user.email,
      bio: user.bio,
      profileImage: user.profileImage,
    },
  });
}

module.exports = {
  registerController,
  loginController,
};
