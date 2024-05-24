import config from './config/index.js';
import express from 'express';
import mongoose from 'mongoose';
import runProcess from './functions/runProcess.js';

const app = express();
const port = config.app.port;

app.get('/', async (req, res) => {
  res.send('Hello World!');
});

app.get('/cron', async (req, res) => {
  await runProcess();
  res.send('Cron job ran successfully.');
});

const mongoURI = config.db.uri;

const connectMongo = async () => {
  try {
    await mongoose.connect(mongoURI);
    console.log('MongoDB connected');
  } catch (err) {
    console.log(err.message);
    process.exit(1);
  }
};

await connectMongo();

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
