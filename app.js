import config from './config/index.js';
import express from 'express';
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

app.listen(port, () => {
  console.log(`app listening on port ${port}`);
});

