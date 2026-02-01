import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { prisma } from "./config/db";
import routes from "./routes/routes";
import { ErrorHandler } from "./middleware/ErrorHandler";

dotenv.config();

const app = express();

const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use("/api/v1", routes);

app.use(ErrorHandler);
async function startServer() {
  try {
    console.log("⏳ Connecting to the database...");
    await prisma.$connect();
    console.log("✅ Database connected successfully!");

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
