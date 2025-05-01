import 'dotenv/config.js';
import express from 'express';
//import cors from 'cors';
import axios from 'axios';
import medications from './routes/medication.js';
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();
const port = process.env.PORT || 3001;

const __filename = fileURLToPath(import.meta.url); // get the resolved path to the file
const __dirname = path.dirname(__filename); // get the name of the directory

console.log(__dirname);


const distPath = path.join(__dirname, '../client/build');
app.use(express.static(distPath));

// Middleware
//app.use(cors());
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

app.get('/*splat', (req, res) => {
  res.sendFile('index.html', {root : distPath});
});



// Start server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
