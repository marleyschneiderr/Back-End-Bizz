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

router.post("/", async (req, res) => {
  try {
    // create a new tag
    const data = await Tag.create(req.body);
    res.json(data);
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
});

router.put("/:id", async (req, res) => {
  try {
    // update a tag's name by its `id` value
    const data = await Tag.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    res.json(data);
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    // delete a tag by its `id` value
    const data = await Tag.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.json(data);
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
});

module.exports = router;
