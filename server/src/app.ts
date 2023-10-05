import 'dotenv/config';
import express, { Express } from "express";
import cors from "cors";
import { authRoutes, userRoutes } from "./routes";

export class App {
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

const app = new App().server;

export default app;
