const Meal = require('../models/Meal');




// Get all meals for the logged-in user
exports.getMeals = async (req, res) => {
  try {
    const meals = await Meal.find({ userId: req.user.id });
    res.json(meals);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Get a specific meal by ID (user only)
exports.getMeal = async (req, res) => {
  try {
    const meal = await Meal.findOne({ _id: req.params.id, userId: req.user.id });
    if (!meal) return res.status(404).json({ message: 'Meal not found' });
    res.json(meal);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};


// Create a new meal
exports.createMeal = async (req, res) => {
  try {
    const { name, calories, protein, carbs, fat, date } = req.body;  // Use `name` instead of `mealType`

    if (!name || !calories) {
      return res.status(400).json({ message: 'Meal name and calories are required.' });
    }

    const meal = new Meal({
      userId: req.user.id, // from JWT
      name,
      calories,
      protein: protein || 0,
      carbs: carbs || 0,
      fat: fat || 0,
      date
    });

    await meal.save();
    res.status(201).json(meal);
  } catch (err) {
    res.status(400).json({ message: 'Invalid meal data' });
  }
};


// Update an existing meal
exports.updateMeal = async (req, res) => {
  try {
    const { name, calories, protein, carbs, fat } = req.body;
    const meal = await Meal.findOneAndUpdate(
      { _id: req.params.id, userId: req.user.id },
      { name, calories, protein, carbs, fat },
      { new: true }
    );
    if (!meal) return res.status(404).json({ message: 'Meal not found' });
    res.json(meal);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Delete a meal
exports.deleteMeal = async (req, res) => {
  try {
    const meal = await Meal.findOneAndDelete({ _id: req.params.id, userId: req.user.id });
    if (!meal) return res.status(404).json({ message: 'Meal not found' });
    res.json({ message: 'Meal deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Public meals (no user ID filter, no password)
exports.getPublicMeals = async (req, res) => {
  try {
    const meals = await Meal.find().select('-userId');
    res.json(meals);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};