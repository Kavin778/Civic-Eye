import { Router } from "express";
import userRoutes from "./userRoutes"
import reportRoutes from "./reportRoutes"

const router = Router();

router.use("/users",userRoutes)
router.use("/reports", reportRoutes);

export default router