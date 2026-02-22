import { Router } from "express";
import { createReportController, getAllReportsController, getReportController } from "../controllers/reportController";
import { authMiddleware } from "../middleware/authMIddleware";

const router = Router();

router.post("/create-report", authMiddleware, createReportController);
router.get("/get-reports", authMiddleware, getAllReportsController);
router.get("/:reportId", authMiddleware, getReportController);

export default router;