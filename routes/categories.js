const router = require("express").Router();
const Category = require("../models/Category");

router.post("/", async (req, res) => {
  const newCat = new Category(req.body);
  try {
    const savedCat = await newCat.save();
    res.status(200).json(savedCat);
    return;
  } catch (err) {
    res.status(500).json(err);
    return;
  }
});
router.get("/", async (req, res) => {
  try {
    const cats = await Category.find();
    res.status(200).json(cats);
    return;
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
