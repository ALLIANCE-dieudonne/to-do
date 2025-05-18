import { Router } from "express";
import { checkLoggedIn, checkAdmin } from "../middleware/authMiddleware";
// import {getUserTasks, getAllTasks,createTask, updateTask, deleteTask } from "../controller/task"

const router = Router()

// router.get("/", [checkLoggedIn], getUserTasks)
// router.get("/all", [checkAdmin], getAllTasks)
// router.post("/",[checkLoggedIn],createTask)
// router.put("/:id", [checkLoggedIn], updateTask)
// router.delete("/:id", [checkLoggedIn], deleteTask)
router.get("/", (req, res) =>{
    console.log("hello")
})
export default router