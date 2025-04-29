import 'dotenv/config.js';
import express from 'express';
import cors from 'cors';
import axios from 'axios';
import medications from './routes/medication.js';

const app = express();
const port = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());
app.use("/medication", medications);

// Routes
app.get('/', (req, res) => {
  res.send('Hello from the server!');
});

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
