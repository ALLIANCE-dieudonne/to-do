import { Router } from "express";
import { validationMiddleware } from "../middleware/validationMiddleware";
import { CreateUserDTO } from "../dto/createUserDTO";
import { createUser, login, me } from "../controller/user";
import { checkLoggedIn } from "../middleware/authMiddleware";

const router = Router()

router.post("/create", [validationMiddleware(CreateUserDTO)], createUser)
router.post("/login",login)
router.get("/me",[checkLoggedIn],me)
export default router