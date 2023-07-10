import express from "express";
import cors from "cors";
import { userRoutes } from "./routes";

class App {
  public server;

  constructor() {
    this.server = express();
    this.middleware();
    this.routes();
  }

  middleware() {
    this.server.use(express.json());
    this.server.use(cors());
  }

  routes() {
    this.server.use("/api/users", userRoutes);
  }
}

export default new App().server;
