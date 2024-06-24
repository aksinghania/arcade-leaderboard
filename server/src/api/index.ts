import express from 'express';
import axios from 'axios';


import MessageResponse from '../interfaces/MessageResponse';
import emojis from './emojis';

const router = express.Router();

router.get<{}, MessageResponse>('/', (req, res) => {
  res.json({
    message: 'API - 👋🌎🌍🌏',
  });
});

router.use('/emojis', emojis);

// /api/v1/stats/U0217R0029Z
// https://arcade-leaderboard-kr5n0x8n2-akshatsinghanias-projects-a4067bab.vercel.app/api/v1/stats/U0217R0029Z
router.get('/stats/:username', async (req, res) => {
  const username = req.params.username;
  const url = `https://hackhour.hackclub.com/api/stats/${username}`;

  try {
    const response = await axios.get(url, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).json({ error: 'Error fetching data' });
  }
});

export default router;
