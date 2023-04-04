const router = require("express").Router();
const { Tag, Product, ProductTag } = require("../../models");

// GET all tags and include their associated Product data
router.get("/", async (req, res) => {
  try {
    const data = await Tag.findAll({
      include: {
        model: Product,
        through: ProductTag,
      },
    });
    res.json(data);
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
});

// GET a single tag by id and include its associated Product data
router.get("/:id", async (req, res) => {
  try {
    const data = await Tag.findByPk(req.params.id, {
      include: {
        model: Product,
        through: ProductTag,
      },
    });
    // Return 404 error if the tag is not found
    if (!data) {
      res
        .status(404)
        .json({ message: `No tag found with id ${req.params.id}` });
    }
    res.json(data);
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
});

router.post("/", (req, res) => {
  // create a new tag
});

router.put("/:id", (req, res) => {
  // update a tag's name by its `id` value
});

router.delete("/:id", (req, res) => {
  // delete on tag by its `id` value
});

module.exports = router;
