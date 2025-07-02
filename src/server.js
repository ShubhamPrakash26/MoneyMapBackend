import express from 'express';
import dotenv from 'dotenv';
import { initDB} from './config/db.js';
import rateLimiter from './middleware/rateLimiter.js';
import transactionsRoute from './routes/transactionsRoute.js';
import job from './config/cron.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

if(process.env.NODE_ENV === 'production') {
    job.start();    // Start the cron job if in production environment
    console.log("Cron job started");
}

//Middleware
app.use(express.json());
app.use(rateLimiter);

// Routes
app.get("/api/health", (req, res) => {
    res.status(200).json({ message: "Server is healthy" });
});

app.get("/", (req, res) => {
    res.status(200).json({ message: "Welcome to the MonyMap App API" });
})

app.use("/api/transactions", transactionsRoute)



initDB().then(() =>{
    app.listen(PORT, () =>{
        console.log(`Server is running on port ${PORT}`);
    })
})
