import express from 'express';
import connectDatabase from './config/db';

const app = express();

connectDatabase();

app.get('/', (req, res) =>
res.send('api ping sent'));

app.listen(3000, () => console.log('Express server running on port 3000'));