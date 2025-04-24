const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const userRoutes = require('./routes/user');
const workoutRoutes = require('./routes/workout');
const mealRoutes = require('./routes/meal');

dotenv.config();
const app = express();
app.use(express.json());

app.use('/users', userRoutes);
app.use('/workouts', workoutRoutes);
app.use('/meals', mealRoutes);

mongoose.connect(process.env.MONGO_URI)
  .then(() => app.listen(5000, () => console.log("Server running on port 5000")))
  .catch(err => console.error(err));
