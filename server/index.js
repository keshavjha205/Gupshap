import express from "express"
import dotenv from "dotenv"
import connectDB from "./src/lib/db.js"
import authRoutes from './src/routes/auth.route.js'
import messageRoutes from './src/routes/message.route.js'
import cookieParser from "cookie-parser"
import cors from "cors"

dotenv.config()

const app = express();

const PORT = process.env.PORT;

// middleware
app.use(express.json({ limit: '10mb' }));
app.use(cookieParser());
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
}));

app.use("/api/auth", authRoutes)
app.use("/api/messages", messageRoutes)

app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`);
    connectDB();
})