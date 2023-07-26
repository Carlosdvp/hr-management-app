import { Router } from "express";
import { authController } from "../controllers/auth.controllers";

const routes = Router();

routes.post("/register", authController.registerNewUser);
routes.post("/login", authController.userLogin);
routes.post("/logout", authController.userLogout);

export default routes;
