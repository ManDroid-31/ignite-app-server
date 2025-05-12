import dotenv from "dotenv";
dotenv.config();
import express, { json, urlencoded } from "express";
import cors from "cors";
import corsOptions from "./utils/corsOption";

const app = express();

// Built-in JSON/body parsing
app.use(json());                              
app.use(urlencoded({ extended: true }));     

// CORS
app.use(cors(corsOptions));                          
                         

// Example ping route
app.get("/ping", (_req, res) => res.json({ message: "pong" }));


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));

