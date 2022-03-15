const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");

//Register
router.post("/register", async (req, res) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPass = await bcrypt.hash(req.body.password, salt);
    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: hashedPass,
    });
    console.log(req.body.username);
    console.log(req.body.email);
    console.log(hashedPass);
    const user = await newUser.save();
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;

//TODO: login

//Login
router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({
      username: req.body.username,
    });

    if (!user) {
      res.status(400).json("Wrong Creds a");
      return;
    }
    const validated = await bcrypt.compare(req.body.password, user.password);
    // !validated && res.status(400).json("Wrong Creds");
    if (!validated) {
      res.status(400).json("Wrong Creds b");
      return;
    }
    const {password, ...others} = user._doc;
    res.status(200).json(others);
    return;
  } catch (err) {
    res.status(500).json(err);
    return;
  }
});
