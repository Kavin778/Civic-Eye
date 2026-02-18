import { Router } from "express";
import { createReportController } from "../controllers/reportController";

const router = Router();

router.post("/create-report", createReportController);

export default router;