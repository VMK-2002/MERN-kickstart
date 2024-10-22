import express from 'express'; 
import dotenv from 'dotenv';
dotenv.config();
import {connectDB} from "./config/db.js";
import productRoute from './Router/productRoute.js';
import cors from "cors";
import path from "path";


const app = express();

app.use(cors());

app.use(express.json());

app.use("/api/products", productRoute);

// const corsOptions = {
//     origin: 'http://localhost:5173', // Frontend origin
//     methods: ['GET', 'POST', 'PUT', 'DELETE'],
//     allowedHeaders: ['Content-Type'],
//   };

const port = process.env.PORT || 5000;
const __dirname = path.resolve();

if(process.env.NODE_ENV === "production"){
    app.use(express.static(path.join(__dirname, "/FRONTEND/demo/dist")));

    app.get("*", (req, res ) => {
        res.sendFile(path.resolve(__dirname, "FRONTEND","demo", "dist", "index.html"));
    });
}


app.listen(port, () => {
    connectDB();
    console.log("server started at http://localhost:" + port);
});
