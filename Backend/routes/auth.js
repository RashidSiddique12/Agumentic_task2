const router = require("express").Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const config = require("../config/config");
const User = require("../model/user.model");
const Attendence = require("../model/attendence.model");

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(401).json({ message: "Invalid password" });
    }

    const token = jwt.sign({ _id: user._id, email }, config.jwtSecret);
    res.cookie("x-access-token", token, {
      withCredentials: true,
      httpOnly: true,
    });

    //login done now attendence data base create for this emp
    const prev = await Attendence.findOne({ email });
    if (!prev) {
      const newattendence = new Attendence({
        email,
        lastTimestamp: Date.now(),
        duration: 0,
      });
      await newattendence.save();
    }

    return res.status(200).json({ token });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

router.patch("/logout", async (req, res) => {
  try {
    // console.log(req.cookies);
    const token = req.cookies["x-access-token"];
    const decoded = jwt.verify(token, config.jwtSecret);
    const email = decoded.email;
    // console.log(email);

    timestamp = 1;

    const already = await Attendence.findOne({ email });
    console.log(already);
    const diff = Date.now() - already.lastTimestamp;
    await Attendence.updateOne(
      { email },
      { duration: already.duration + diff }
    );

    // const timestamp = 5;

    // const updatetime = new Attendence({
    //   email,
    //   timestamp: Date.now(),
    // });
    // await newattendence.save();

    // const user = await User.findOne({ email });
    // if (!user) {

    //   return res.status(404).json({ message: "User not found" });
    // }

    // const token = jwt.sign({ _id: user._id }, config.jwtSecret);

    // return res.status(200).json({ token });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
