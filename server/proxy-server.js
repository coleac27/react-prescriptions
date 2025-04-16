const express = require('express');
const cors = require('cors');
const axios = require('axios');
require('dotenv').config();


const app = express();
const port = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.get('/api/medication', async (req, res) => {
  try {
    const response = await axios.get('https://connect.medlineplus.gov/service', {
      params: req.query,
      headers: {
        "Content-Type": "application/xml; charset=utf-8"
      },
      responseType: 'text'
    });

    console.log('Your xml file as string Server', response.data);
    res.send(response.data);
    
  } catch (error) {
    console.error('Server error:', error);
    res.status(500).send(error.message);
  }

  
});

// Start server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
