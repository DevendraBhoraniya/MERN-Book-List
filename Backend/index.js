import express, { response as res } from "express";
import { PORT, monogodbUrl } from "./config.js"
import mongoose from "mongoose";
import booksRoute from "./routes/booksRoute.js"
import cors from "cors";

const app = express();

//Middleware for parsing request body
app.use(express.json());

// middleware fro handling Cors POLIcY 
//opt 1 : allow all origins with Default of CORS
app.use(cors());
// Option 2: Allow Custom Origins
// app.use(
//   cors({
//     origin: 'http://localhost:3000',
//     methods: ['GET', 'POST', 'PUT', 'DELETE'],
//     allowedHeaders: ['Content-Type'],
//   })
// );

// home page route 
app.get("/", (req, res) => {
    res.statusCode = 200;
    return res.send("welcome To MERN stack")
})

app.use('/books' , booksRoute)

//connect to mongo db and then run server 
mongoose.connect(monogodbUrl)
    .then(() => {
        console.log("App connected to Database");
        app.listen(PORT, () => {
            console.log(`app is listening to PORT : ${PORT}`)
        })
    })
    .catch((error) => {
        console.log("mongoose error", error)
    })