import dotenv from "dotenv";
dotenv.config();
import express, { json, urlencoded } from "express";
import cors from "cors";
import corsOptions from "./utils/corsOption.js";

const app = express();


//Middlewares
app.use(express.json());                              
app.use(urlencoded({ extended: true }));   
app.use(json());
app.use(express.static("public"));


// CORS
app.use(cors(corsOptions));                          
                         

// Routes
// Example ping route
app.get("/ping", (_req, res) => res.json({ message: "pong" }));




// start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));

