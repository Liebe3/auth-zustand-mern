const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const {
  findByEmail,
  findById,
  createUser,
} = require("../repositories/userRepository");

const generateTokens = (user) => {
  const accessToken = jwt.sign(
    { id: user._id, role: user.role, type: "access" },
    process.env.JWT_SECRET,
    { expiresIn: "15m" }
  );

  const refreshToken = jwt.sign(
    { id: user._id, role: user.role, type: "refresh" },
    process.env.JWT_REFRESH_SECRET,
    { expiresIn: "30d" }
  );

  return { accessToken, refreshToken };
};

exports.registerUser = async ({
  firstName,
  lastName,
  email,
  password,
  confirmPassword,
  role,
}) => {
  const existingUser = await findByEmail(email);

  if (existingUser) {
    throw new Error("User already exist");
  }

  if (password !== confirmPassword) {
    throw new Error("Password dont match");
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = await createUser({
    firstName,
    lastName,
    email,
    password: hashedPassword,
    role,
  });
  return newUser;
};

exports.loginUser = async ({ email, password }) => {
  try {
    const user = await findByEmail(email);

    if (!user) {
      throw new Error("Invalid credentials");
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new Error("Invalid credentials");
    }

    const { accessToken, refreshToken } = generateTokens(user);

    return { user, accessToken, refreshToken };
  } catch (error) {
    throw error;
  }
};

exports.refreshAccessToken = async (refreshToken) => {
  try {
    if (!refreshToken) {
      throw new Error("Refresh token not fouund");
    }

    const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);

    if (decoded.type !== "refresh") {
      throw new Error("Invalid token type");
    }

    const user = await findById(decoded.id);
    if (!user) {
      throw new Error("User not found");
    }

    const accessToken = jwt.sign(
      { id: user._id, type: "access" },
      process.env.JWT_SECRET,
      { expiresIn: "15m" }
    );

    return { user, accessToken };
  } catch (error) {
    throw error;
  }
};
