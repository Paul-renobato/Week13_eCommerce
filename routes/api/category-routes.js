const router = require('express').Router();
const { Category, Product } = require('../../models');

router.get('/', async (req, res) => {
  try {
    const allCategories = await Category.findAll({
      include: [{ model: Product }],
    });
    res.status(200).json(allCategories);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  try {
    const oneCategory = await Category.findByPk(req.params.id, {
      include: [{ model: Product }],
    })

    if (!oneCategory) {
      res.status(404).json({ message: 'category not found.'});
      return;
    }
    res.status(200).json(oneCategory);
  } catch (err) {
    res.status(500).json(err);
  }
});
router.post('/',async (req, res) => {
  try {
    const oneCategory = await Category.create(req.body);
      res.status(200).json(oneCategory);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.put('/:id', async (req, res) => {
  try {
    const oneCategory = await Category.update(req.body, {
      where: {
        id: req.params.id
      },
    });
    if (!oneCategory) {
      res.status(404).json({ message: 'category not found.'});
      return;
    }
    res.status(200).json(oneCategory);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const oneCategory = await Category.destroy({
      where: {
        id: req.params.id,
      },
    });
    if (!oneCategory) {
      res.status(404).json({ message: 'category not found.'});
      return;
    }
    res.status(200).json(oneCategory);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
