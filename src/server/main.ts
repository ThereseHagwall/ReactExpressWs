import {config} from 'dotenv';
config();
import express from "express";
import ViteExpress from "vite-express";
import mongoose from 'mongoose';
import userRouter from './routes/userRoutes'
import productsRouter from './routes/productsRoutes'
import orderRouter from './routes/orderRoutes'

const app = express();

app.use(express.json());
app.use('/user', userRouter);
app.use('/product', productsRouter);
app.use('/order', orderRouter);


mongoose.connect(process.env.VITE_REACT_APP_URL!).then(() => {
  console.log('Connected to db')
  ViteExpress.listen(app, 3000, () =>
    console.log("Server is listening on port 3000...")
  );
})

