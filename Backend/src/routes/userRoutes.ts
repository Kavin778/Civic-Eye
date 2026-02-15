import { Router } from "express";
import { createUserController, getUserController } from "../controllers/userController";
import { authMiddleware } from "../middleware/authMIddleware";

const router = Router();

router.post("/create-user",createUserController);
router.get("/user-profile",authMiddleware,getUserController);

export default router;