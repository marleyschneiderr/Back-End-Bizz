const router = require("express").Router();
const { Category, Product } = require("../../models");

// The `/api/categories` endpoint

router.get("/", (req, res) => {
  // find all categories
  // be sure to include its associated Products
  Category.findAll({
    include: [
      {
        model: Product,
        attributes: ["id", "product_name", "price", "category_id"],
      },
    ],
  })
  .then((categoryData) => {
    res.json({ msg: "HTTP GET to /api/categories successful", categoryData });
  })
  .catch((err) => {
    console.log(err);
    res.status(500).json(err);
  });
});

router.get("/:id", (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  const categoryId = req.params.id;
  Category.findByPk({
    categoryId,
    include: [
      {
        model: Product,
        attributes: ["id", "product_name", "price", "category_id"],
      },
    ],
  }).then((categoryData) => {
    res.json({ msg: "HTTP GET to /api/categories successful", categoryData });
  });
});



router.post("/", (req, res) => {
  // create a new category
});

router.put("/:id", (req, res) => {
  // update a category by its `id` value
});

router.delete("/:id", (req, res) => {
  // delete a category by its `id` value
});

module.exports = router;
