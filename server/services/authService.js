const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const { findByEmail, createUser } = require("../repositories/userRepository");

exports.registerUser = async ({
  firstName,
  lastName,
  email,
  password,
  confirmPassword,
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
  });
  return newUser;
};

exports.loginUser = async ({ email, password }) => {
  const user = await findByEmail(email);

  if (!user) {
    throw new Error("Invalid credentials");
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new Error("Invalid credentials");
  }

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });

  return { user, token };
};
