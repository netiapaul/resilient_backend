const User = require("../model/userModels");
var jwt = require("jsonwebtoken");

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

const signUp = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const newUser = await User.create({
      username: username,
      email: email,
      password: password,
    });

    res.status(201).json({
      status: "success",
      data: { user: newUser },
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      status: "failed",
      data: { message: error },
    });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  // Checks if a request bosy has been passed
  if (!email || !password) {
    return res.status(400).json({
      status: "failed",
      data: { message: "Please provide your credentials" },
    });
  }
  // Check if user exists and the password passed is correct
  const user = await User.findOne({ email });
  if (!user || !(await user.correctPassword(password, user.password))) {
    return res.status(404).json({
      status: "failed",
      data: { message: "Incorect email or password" },
    });
  }

  const token = signToken(user._id);

  res.status(201).json({
    status: "success",
    token,
    data: user,
  });
  try {
  } catch (error) {
    console.log(error);
    res.status(400).json({
      status: "failed",
      data: { message: error },
    });
  }
};

const userDetails = async (req, res) => {
  try {
    const user = await User.findById(req.params.id)
      .select("-password")
      .populate("loans");

    if (!user) {
      return res.status(404).json({
        status: "failed",
        message: `Request failed: The user with id: ${req.params.id} does not exist`,
      });
    }

    res.status(200).json({
      status: "success",
      data: { user },
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      status: "failed",
      message: "Request failed",
    });
  }
};

const routeProtect = async (req, res, next) => {
  try {
    let token;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }

    if (!token) {
      res.status(400).json({
        status: "failed",
        message: "User is not logged in",
      });
    }

    const decode = jwt.verify(token, process.env.JWT_SECRET);

    const currentUser = await User.findById(decode.id).populate("loans");

    if (!currentUser) {
      return res.status(400).json({
        status: "failed",
        message: "Current User doesnot exist",
      });
    }

    req.user = currentUser;

    // req.headers.authorization
    next();
  } catch (error) {
    console.log(error);
    res.status(400).json({
      status: "failed",
      message: "Request failed",
    });
  }
};

module.exports = { signUp, login, userDetails, routeProtect };
