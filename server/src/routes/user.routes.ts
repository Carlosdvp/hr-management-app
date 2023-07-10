import { Router } from "express";
import { userController } from "../controllers/user.controllers";

const routes = Router();

routes.get("/", userController.getUsers);
routes.get("/:email", userController.findUniqueUser);
routes.post("/add-user", userController.addUser);
routes.put('/:email', userController.updateUser);
routes.delete('/:email', userController.deleteUser);

export default routes;
