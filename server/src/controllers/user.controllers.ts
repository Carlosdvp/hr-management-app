import { Request, Response } from "express";
import prisma from "../services/prisma";

export const userController = {
  async getUsers(req: Request, res: Response) {
    const users = await prisma.user.findMany();

    return res.json(users);
  },
  async addUser(req: Request, res: Response) {
    const userData = req.body;
    const user = await prisma.user.create({
      data: {
        firstName: userData.firstName,
        lastName: userData.lastName,
        email: userData.email,
        password: userData.password,
      }
    });

    return res.json({ user: user });
  },
  async findUniqueUser(req: Request, res: Response) {
    const paramEmail = req.params.email;

    const uniqueUser = await prisma.user.findUnique({
      where: {
        email: paramEmail,
      }
    });

    return res.json({ uniqueUser: uniqueUser });
  },
  async updateUser(req: Request, res: Response) {
    const paramEmail = req.params.email;
    const userName = req.body.firstName;

    const updatedUser = await prisma.user.update({
      data: {
        firstName: userName,
      },
      where: {
        email: paramEmail,
      },
    });

    return res.json({ updatedUser: updatedUser });
  },
  async deleteUser(req: Request, res: Response) {
    const paramEmail = req.params.email;

    const deletedUser = await prisma.user.delete({
      where: {
        email: paramEmail,
      },
    });

    return res.json({ deletedUser: deletedUser });
  },
};
