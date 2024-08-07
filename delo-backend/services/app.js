import express from 'express';
import cors from 'cors'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import connectToDatabase from './api/db/connection.js';
import dotenv from 'dotenv';
import adminRoute from './api/routes/admin/admin.routes.js'
import axios from 'axios';

const app = express()

const corsOptions = {
  origin: (origin, callback) => {
    console.log("Request Origin:", origin);
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);

    // Allow any origin
    callback(null, true);
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
};

app.use(cors(corsOptions));

app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser())
app.use(bodyParser.json({ extended: true }))
app.use(bodyParser.urlencoded({ extended: true }))

connectToDatabase()
app.use("/api/v1", adminRoute)



export default app