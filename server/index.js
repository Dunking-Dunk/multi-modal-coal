import 'dotenv/config'
import "express-async-errors";
import express from 'express'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import { createServer } from 'http'
import { Server } from 'socket.io'
import {connection} from './socket.js'

import UserRouter from './routes/User.js'
import ErrorHandler from './middleware/ErrorHandler.js'

const app = express()
const PORT = 4000
const httpServer = createServer(app)
export const io = new Server(httpServer)

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("successfully connected to Mongodb");
  })
  .catch((err) => {
    console.log(err);
  });
connection()

  
app.use(
    cors({
      origin: ["http://localhost:5173"],
      methods: ["GET", "POST", "DELETE", "PUT"],
      credentials: true,
    })
  );


app.use(bodyParser.json({ limit: "50mb" }));
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api/users', UserRouter)

app.get('/', (req, res) => {
    res.send('hello')
})

app.use(ErrorHandler)

httpServer.listen(PORT, () => {
  console.log('listening on port 4000')
})