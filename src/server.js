import dotenv from 'dotenv';
import morgan from 'morgan';
import express from 'express';
import session from 'express-session';
import cookieParser from 'cookie-parser';
import routes from './routes/index.js';
import { isAuthenticated } from './middleware/authMiddleware.js';
import { initialize, dropTables } from './config/db.js';

dotenv.config(); // Load .env files

const app = express(); // Create express app

// Middlewares
app.use(express.json());
app.use(cookieParser());
app.use(morgan('dev'));
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    saveUninitialized: false,
    resave: false,
    cookie: {
      maxAge: 1000 * 60 * 60 * 3,
      secure: false, // set true if you are using https
    },
  }),
);

// For saving tables to database
// initialize();
// For dropping tables from database
// dropTables();

app.use('/api/v1', routes); // Setup routes

app.get('/api/v1/auth/protected', isAuthenticated, (req, res) => {
  res.send({ message: "hello my boi" });
});

const PORT = process.env.PORT || 3000; // Application port

app.listen(PORT, () => console.log(`App runs on http://localhost:${PORT}`)); // Listening requests
