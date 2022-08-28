const Category = require('../models/Category');

exports.createCategory = async (req, res) => {
  const category = await Category.create(req.body);
  try {
    res.status(201).redirect('/users/dashboard');
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      error,
    });
  }
};
exports.deleteCategory = async (req, res) => {
  
  try {
   await Category.findByIdAndRemove(req.params.id);
    res.status(200).redirect('/users/dashboard');
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      error,
    });
  }
};