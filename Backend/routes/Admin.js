const router = require("express").Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const config = require("../config/config");
const User = require("../model/user.model");
const Admin = require("../model/admin.model");

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email.trim()) {
      return res.status(400).json({ message: "Please enter your Email " });
    }
    if (!password) {
      return res.status(400).json({ message: "Please enter your Password " });
    }

    const admin = await Admin.findOne({ email });

    if (!admin) {
      return res.status(404).json({ message: "Admin not found" });
    }

    const validPassword = await bcrypt.compare(password, admin.password);
    if (!validPassword) {
      return res.status(401).json({ message: "Invalid password" });
    }

    const token = jwt.sign({ _id: admin._id }, config.jwtSecret);

    res.cookie("x-access-token", token, {
      withCredentials: true,
      httpOnly: true,
    });

    return res
      .status(200)
      .json({ token, message: "Admin loggedin successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

// router.post("/add/", async (req, res) => {
//   try {
//     const { email, password } = req.body;
//     console.log(email);

//     const salt = await bcrypt.genSalt(10);
//     const hashedPassword = await bcrypt.hash(password, salt);

//     const newAdmin = new Admin({ email, password: hashedPassword });
//     await newAdmin.save();

//     return res.status(200).json({ token, message: "Admin added successfully" });
//   } catch (error) {
//     console.log(error);
//     return res.status(500).json({ message: "Internal server error" });
//   }
// });

router.post("/register-employee", async (req, res) => {
  try {
    const { name, contact, email, gender, password, photo } = req.body;
    // console.log(email);
    if (!name || !name.trim())
      return res.status(400).json({ message: "Please enter employee name" });
    if (!contact)
      return res.status(400).json({ message: "Please enter employee contact" });
    if (!email || !email.trim())
      return res.status(400).json({ message: "Please enter employee email" });
    if (!gender || !gender.trim())
      return res.status(400).json({ message: "Please enter employee gender" });
    if (!password || !password)
      return res
        .status(400)
        .json({ message: "Please enter employee password" });
    if (!photo || !photo)
      return res.status(400).json({ message: "Please enter employee photo" });

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "Employee already exists" });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      name,
      contact,
      email,
      gender,
      password: hashedPassword,
      photo,
    });
    await newUser.save();

    return res
      .status(201)
      .json({ message: "Employee registered successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
