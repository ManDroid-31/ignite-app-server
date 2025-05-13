import dotenv from 'dotenv';

// utils/corsOptions.js
dotenv.config();

const whitelist = (process.env.CORS_ORIGIN || '').split(',').map(u => u.trim());

const corsOptions = {
  origin: (origin, callback) => {
    // allow requests with no origin (like mobile apps or curl)
    if (!origin || whitelist.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  optionsSuccessStatus: 200,
};

export default corsOptions;
