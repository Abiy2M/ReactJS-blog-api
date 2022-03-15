const router = require("express").Router();
const User = require("../models/User");
const Post = require("../models/Post");
const bcrypt = require("bcrypt");

//UPDATE
router.put("/:id", async (req, res) => {
  if (req.body.userId === req.params.id) {
    if (req.body.password) {
      const salt = await bcrypt.genSalt(10);
      req.body.password = await bcrypt.compare(req.body.password, salt);
    }
    try {
      const updatedUser = await User.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );
      res.status(200).json(updatedUser);
    } catch (err) {
      res.status(500).json(err);
      return;
    }
  } else {
    res.status(401).json("You are not allowed to access this content");
    return;
  }
});


//DELETE

router.delete("/:id", async (req, res) => {
  if (req.body.userId === req.params.id) {
    try {
        const user = await User.findById(req.params.id)
      try {
          await Post.deleteMany({username: user.username})
        await User.findByIdAndDelete(req.params.id, { new: true });
        res.status(200).json("Account Deleted Succesfully");
      } catch (err) {
        res.status(500).json(err);
        return;
      }
    } catch (err) {
      res.status(404).json('User account not found');
    }
  } else {
    res.status(401).json("You are not allowed to delete this content");
    return;
  }
});

//GET

router.get("/:id", async (req, res) => {
    try{
        const user = await User.findById(req.params.id);
        const {password, ...others} = user._doc;
        res.status(200).json(others);
        // return;
    }catch (err) {
        res.status(500).json(err)
        return;
    }
    
})



module.exports = router;