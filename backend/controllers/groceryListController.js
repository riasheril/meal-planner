const groceryListService = require('@services/groceryListService');

// Placeholder grocery list controller
exports.generate = async (req, res) => {
  try {
    const userId = req.user ? req.user._id : req.body.userId;
    const { recipeIds } = req.body;
    const groceryList = await groceryListService.generateGroceryList(userId, recipeIds);
    res.status(201).json({ message: 'Grocery list generated', groceryList });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getByUser = async (req, res) => {
  try {
    const userId = req.user ? req.user._id : req.query.userId;
    const lists = await groceryListService.getGroceryListsByUser(userId);
    res.json({ groceryLists: lists });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.update = async (req, res) => {
  try {
    const { id } = req.params;
    const updated = await groceryListService.updateGroceryList(id, req.body);
    if (!updated) return res.status(404).json({ error: 'Grocery list not found' });
    res.json({ message: 'Grocery list updated', groceryList: updated });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.create = async (req, res) => {
  try {
    const groceryList = await groceryListService.createGroceryList(req.body);
    res.status(201).json({ message: 'Grocery list created', groceryList });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getById = async (req, res) => {
  try {
    const { id } = req.params;
    const groceryList = await groceryListService.getGroceryListById(id);
    if (!groceryList) return res.status(404).json({ error: 'Grocery list not found' });
    res.json({ groceryList });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.listAll = async (req, res) => {
  try {
    const lists = await groceryListService.listAllGroceryLists();
    res.json({ groceryLists: lists });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.delete = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await groceryListService.deleteGroceryList(id);
    if (!deleted) return res.status(404).json({ error: 'Grocery list not found' });
    res.json({ message: 'Grocery list deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}; 