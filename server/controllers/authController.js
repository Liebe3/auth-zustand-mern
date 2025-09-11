const {
  registerUser,
  loginUser,
  refreshAccessToken,
} = require("../services/authService");

const getCookieOptions = () => ({
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "strict",
  maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
  path: "/api/auth",
});

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
    const { user, accessToken, refreshToken } = await loginUser(req.body);

    res.cookie("refreshToken", refreshToken, getCookieOptions());

    res.status(200).json({
      success: true,
      message: "User logged in successfully",
      user: {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        role: user.role,
      },
      accessToken,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

exports.refreshToken = async (req, res) => {
  try {
    const refreshToken = req.cookies.refreshToken;
    const { user, accessToken } = await refreshAccessToken(refreshToken);

    res.status(200).json({
      success: true,
      message: "Token refreshed successfully",
      user: {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        role: user.role,
      },
      accessToken,
    });
  } catch (error) {
    res.clearCookie("refreshToken", { path: "/api/auth" });

    res.status(401).json({
      success: false,
      message: error.message,
    });
  }
};

exports.logout = async (req, res) => {
  try {
    res.clearCookie("refreshToken", { path: "/api/auth" });
    res.status(200).json({
      success: true,
      message: "Logged out successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Logout failed" || error.message,
    });
  }
};
