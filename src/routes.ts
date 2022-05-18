import { Router } from "express";

import { UserController } from "./controllers/Users/UserController";
import { AuthUser } from "./controllers/Session/NewUserSession";
import { ensureAuthenticated } from "./middlewares/authValidation";

const createUser = new UserController();
const authUser = new AuthUser();
const auth = ensureAuthenticated;

const router = Router();

router.get("/", createUser.index);

router.get("/user/:id", createUser.findById);
router.post("/user", createUser.store);
router.post("/auth", authUser.signIn);

export { router };
