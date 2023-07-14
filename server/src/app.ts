import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { envs, Client } from "stytch";
import { userRoutes } from "./routes";

dotenv.config();

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

const client = new Client({
  project_id: process.env.PROJECT_ID,
  secret: process.env.STYTCH_API_SECRET,
  env: envs.test,
});

export default new App().server;
