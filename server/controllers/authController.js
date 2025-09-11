const { registerUser, loginUser } = require("../services/authService");

exports.register = async (req, res) => {
  try {
    const user = await registerUser(req.body);
    res
      .status(201)
      .json({ success: true, message: "User regsiter successfully", user });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { user, token } = await loginUser(req.body);
    res
      .status(201)
      .json({ success: true, message: "User login successfully", user, token });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};
