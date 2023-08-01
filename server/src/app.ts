import express, { Express } from "express";
import cors from "cors";
import dotenv from "dotenv";
import { authRoutes, userRoutes } from "./routes";

dotenv.config();

class App {
  public server: Express;

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
    this.server.use("/api/auth", authRoutes);
  }
}

export default new App().server;
