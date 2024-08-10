import dotenv from 'dotenv';
import express from 'express';
import cookieParser from 'cookie-parser';
import routes from './routes/index.js';
import { initialize, dropTables } from './config/db.js';

dotenv.config(); // Load .env files

const app = express(); // Create express app

// Middlewares
app.use(express.json());
app.use(cookieParser());

// Define the route
app.use('/api/v1', routes);

const PORT = process.env.PORT || 3000; // Application port

app.listen(PORT, () => console.log(`App runs on http://localhost:${PORT}`)); // Listening requests
