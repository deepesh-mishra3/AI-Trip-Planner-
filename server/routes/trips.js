const express = require('express');
const axios = require('axios');
const Trip = require('../models/Trip');
const auth = require('../middleware/auth');

const router = express.Router();

// Generate itinerary using OpenRouter GPT
async function generateItinerary(destination, days, companions, budget) {
  const prompt = `Create a detailed ${days}-day travel itinerary for ${destination}. 
This is for a ${companions.toLowerCase()} trip with a budget of ₹${budget}. 
Please provide a detailed hour-by-hour schedule for each day, including:
- Breakfast, lunch, and dinner recommendations
- Tourist attractions and activities
- Approximate costs for activities and meals
- Transportation suggestions
Format the response day-wise with timestamps.`;

  try {
    const response = await axios.post(
      'https://openrouter.ai/api/v1/chat/completions',
      {
        model: 'openai/gpt-3.5-turbo',
        messages: [
          {
            role: 'user',
            content: prompt
          }
        ]
      },
      {
        headers: {
          'Authorization': `Bearer ${process.env.OPENROUTER_API_KEY}`,
          'HTTP-Referer': 'https://localhost:5000',
          'Content-Type': 'application/json'
        }
      }
    );

    return response.data.choices[0].message.content;
  } catch (error) {
    console.error('OpenRouter API Error:', error);
    throw new Error('Failed to generate itinerary');
  }
}

// Generate and save new trip
router.post('/', auth, async (req, res) => {
  try {
    const { destination, days, companions, budget } = req.body;

    // Generate AI itinerary
    const itinerary = await generateItinerary(destination, days, companions, budget);

    // Create and save trip
    const trip = new Trip({
      user: req.userId,
      destination,
      days,
      companions,
      budget,
      itinerary
    });

    await trip.save();
    res.status(201).json(trip);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to create trip' });
  }
});

// Get all trips for user
router.get('/', auth, async (req, res) => {
  try {
    const trips = await Trip.find({ user: req.userId }).sort({ createdAt: -1 });
    res.json(trips);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch trips' });
  }
});

// Get single trip by ID
router.get('/:id', auth, async (req, res) => {
  try {
    const trip = await Trip.findOne({ _id: req.params.id, user: req.userId });
    if (!trip) {
      return res.status(404).json({ message: 'Trip not found' });
    }
    res.json(trip);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch trip' });
  }
});

// Delete trip
router.delete('/:id', auth, async (req, res) => {
  try {
    const trip = await Trip.findOneAndDelete({ _id: req.params.id, user: req.userId });
    if (!trip) {
      return res.status(404).json({ message: 'Trip not found' });
    }
    res.json({ message: 'Trip deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete trip' });
  }
});

module.exports = router; 