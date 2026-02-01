import { Router } from "express";
import { createUserController } from "../controllers/userController";

const router = Router();

router.post("/create-user",createUserController);

export default router;