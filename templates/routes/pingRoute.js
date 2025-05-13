import { Router } from "express";
const router = Router();
import { ping } from "../backend/controllers/pingController";

router.get("/", ping);

export default router;
