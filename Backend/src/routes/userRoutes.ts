import { Router } from "express";
import { createUserController, getUserController } from "../controllers/userController";

const router = Router();

router.post("/create-user",createUserController);
router.get("/user-profile/:id",getUserController);

export default router;