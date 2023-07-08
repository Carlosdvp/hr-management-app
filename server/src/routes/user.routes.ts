import { Router } from "express";
import { userController } from "../controllers/user.controllers";

const routes = Router();

routes.get("/", userController.getUsers);

export default routes;
