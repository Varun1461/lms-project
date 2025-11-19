 import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { config } from 'dotenv';
import morgan from 'morgan';
import userRoutes from './routes/user.routes.js';
import courseRoutes from './routes/course.routes.js';
import errorMiddleware from './middlewares/error.middleware.js';
import paymentRoutes from './routes/payment.routes.js';
import miscellaneousRoutes from './routes/miscellaneous.routes.js';
config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true}));

app.use(cors({
    origin: "http://localhost:5173", // ✅ Allow frontend URL
    credentials: true, // ✅ Allow cookies
    methods: ["GET", "POST", "PUT", "DELETE"], // ✅ Allowed methods
}));
app.use(cookieParser());

app.use(morgan('dev'));

app.use('/ping', function(req, res){
    res.send('/pong');
});


app.use('/api/v1/user',userRoutes);
app.use('/api/v1/courses', courseRoutes);
app.use('/api/v1/payments', paymentRoutes);
app.use('/api/v1/contact', miscellaneousRoutes);
app.use('/api/v1', miscellaneousRoutes);


// routes of 3 modules

app.all('*',(_req, res)=>{
    res.status(404).send('OOPS!! 404 page not found');
});

app.use(errorMiddleware);




export default  app;
