const Workout = require('../models/Workout');

// Get all workouts for the current user
exports.getWorkouts = async (req, res) => {
  try {
    const workouts = await Workout.find({ userId: req.user.id });
    res.json(workouts);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Get a specific workout
exports.getWorkout = async (req, res) => {
  try {
    const workout = await Workout.findOne({ _id: req.params.id, userId: req.user.id });
    if (!workout) return res.status(404).json({ message: 'Workout not found' });
    res.json({ workout }); // Fixed typo here
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Create a workout
exports.createWorkout = async (req, res) => {
  try {
    const { type, duration } = req.body;

    // Optional validation
    if (!type || !duration || duration <= 0) {
      return res.status(400).json({ message: 'Type and valid duration are required' });
    }

    const workout = new Workout({ userId: req.user.id, type, duration });
    await workout.save();
    res.status(201).json(workout.toObject());
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Update a workout
exports.updateWorkout = async (req, res) => {
  try {
    const { type, duration } = req.body;

    const workout = await Workout.findOneAndUpdate(
      { _id: req.params.id, userId: req.user.id },
      { type, duration },
      { new: true }
    );

    if (!workout) return res.status(404).json({ message: 'Workout not found' });

    res.status(200).json({
      message: 'Workout updated successfully',
      updatedWorkout: workout,
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Delete a workout
exports.deleteWorkout = async (req, res) => {
  try {
    const result = await Workout.findOneAndDelete({ _id: req.params.id, userId: req.user.id });
    if (!result) return res.status(404).json({ message: 'Workout not found' });
    res.json({ message: 'Workout deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Get public workouts (no userId shown)
exports.getPublicWorkouts = async (req, res) => {
  try {
    const workouts = await Workout.find().select('-userId');
    res.json(workouts);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};
