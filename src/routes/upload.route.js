import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware";
import { uploadImage } from "../controllers/upload.controller";




const router= Router();

router.post("/",authMiddleware,uploadImage)
export default router;