import express, { Application } from "express";
import cors from "cors";
import dotenv from "dotenv";
import { prisma } from "./config/db";
import routes from "./routes/routes";
import { errorMiddleware } from "./middleware/errorMiddleware";
import { redisClient } from "./config/redis";
import "./types/requestType";

dotenv.config();

const app: Application = express();

const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use("/api/v1", routes);

app.use(errorMiddleware);
async function startServer() {
  try {
    console.log("⏳ Connecting to the database...");
    await prisma.$connect();
    console.log("✅ Database connected successfully!");
    await redisClient.connect();
    console.log("Redis connected successfully");

    app.listen(PORT, () => {
      console.log(`🚀 Server is running on http://localhost:${PORT}`);
    });
  } catch (error) {
    if (error instanceof Error) {
      console.error("❌ Failed to connect:", error.message);
    }
    process.exit(1);
  }
}

startServer();
