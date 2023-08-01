import { Request, Response } from "express";
import prisma from "../services/prisma";
import bcrypt from "bcrypt";

export const userController = {
  async getUsers(req: Request, res: Response) {
    const users: Object = await prisma.user.findMany();

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
    const paramEmail: string = req.params.email;

    const uniqueUser = await prisma.user.findUnique({
      where: {
        email: paramEmail,
      }
    });

    return res.json({ uniqueUser: uniqueUser });
  },
  async updateUser(req: Request, res: Response) {
    const paramEmail: string = req.params.email;
    const newEmail: string = req.body.email;
    const newPassword: string = req.body.password;

    try {
      let updatedUser;

      if (newEmail && newPassword) {
        const hashedPassword = await bcrypt.hash(newPassword, 10);

        updatedUser = await prisma.user.update({
          data: {
            email: newEmail,
            password: hashedPassword,
          },
          where: {
            email: paramEmail,
          },
        });
      } else if(newEmail) {
        updatedUser = await prisma.user.update({
          data: {
            email: newEmail,
          },
          where: {
            email: paramEmail,
          },
        });
      } else if (newPassword) {
        const hashedPassword = await bcrypt.hash(newPassword, 10);

        updatedUser = await prisma.user.update({
          data: {
            password: hashedPassword,
          },
          where: {
            email: paramEmail,
          },
        });
      } else {
        return res.status(400).json({ 
          success: false, 
          message: "Please provide email or password to update"
        });
      }

      return res.json({ 
        success: true, 
        message: "User updated successfully", 
        updatedUser: updatedUser
      });
    } catch (error) {
      console.error('Update user error:', error);
      
      return res.status(500).json({ 
        success: false, 
        message: "Something went wrong, unable to update user."
      });
    }
  },
  async deleteUser(req: Request, res: Response) {
    const paramId: string = req.params.id;

    const deletedUser = await prisma.user.delete({
      where: {
        id: paramId,
      },
    });

    return res.json({ deletedUser: deletedUser });
  },
};
