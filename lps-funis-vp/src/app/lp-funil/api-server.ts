// Force restart: 2025-10-14 00:45
import express from 'express';
import dotenv from 'dotenv';
import diagnosticHandler from './api/generate-diagnostic.js';
import instagramLookupHandler from './api/instagram-lookup.js';
import imageProxyHandler from './api/image-proxy.js';
import instaMessageHandler from './api/generate-insta-message.js';
import cors from 'cors';

dotenv.config();

const apiKey = process.env.OPENAI_API_KEY;
console.log(`[API Server] Checking OpenAI Key: ${apiKey ? `sk-**********${apiKey.slice(-4)}` : 'NOT FOUND'}`);

const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

app.post('/api/generate-diagnostic', diagnosticHandler);
app.post('/api/instagram-lookup', instagramLookupHandler);
app.post('/api/generate-insta-message', instaMessageHandler);
app.get('/api/image-proxy', imageProxyHandler);

app.listen(port, () => {
  console.log(`[API Server] Listening on http://localhost:${port}`);
});
