import { Router } from "express";
import userRouter from "./user";
import tasksRouter from "./tasks";

const router = Router();

router.use("/user", userRouter);
router.use("/tasks", tasksRouter);

export default router;
