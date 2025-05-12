require("dotenv").config();
const express = require("express");
const cors = require("cors");
const corsOptions = require("./utils/corsOption");

const app = express();

// Built-in JSON/body parsing
app.use(express.json());                              
app.use(express.urlencoded({ extended: true }));     

// CORS
app.use(cors(corsOptions));                          
                         

// Example ping route
app.get("/ping", (_req, res) => res.json({ message: "pong" }));


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));

