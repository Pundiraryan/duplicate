import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import usermodel from "../models/user.js";
export const register = async (req, res) => {
  try {
    const {
      careplace,
      supname,
      email,
      password,
      phone,
      add
    } = req.body;

    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);
    console.log(email,password)
    const newUser = new usermodel({
      careplace:careplace,
      supname:supname,
      supid:email,
      pwd: passwordHash,
      phone:phone,
      add:add,
    });
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


export const login = async (req, res) => {
  try {
    const { email,phone, password } = req.body;
    const user = await usermodel.findOne({ supid: email });
    console.log(user);
    if (!user) return res.status(400).json({ msg: "User does not exist. " });
    const isMatch = await bcrypt.compare(password, user.pwd);
    if (!isMatch) return res.status(400).json({ msg: "Invalid credentials. " });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    delete user.pwd;
    res.status(200).json({ token, user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
