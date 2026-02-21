import { Router } from "express";
import { createReportController, getReportController } from "../controllers/reportController";
import { authMiddleware } from "../middleware/authMIddleware";

const router = Router();

router.post("/create-report", authMiddleware, createReportController);
router.get("/:reportId", authMiddleware, getReportController);

export default router;