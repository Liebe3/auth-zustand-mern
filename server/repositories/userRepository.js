const User = require("../models/User");

exports.findByEmail = (email) => User.findOne({ email });
exports.findById = (id) => User.findById(id).select("-password")
exports.createUser = (data) => User.create(data);
