import { Request, Response } from "express";
import prisma from "../services/prisma";
import bcrypt from "bcrypt";

export const userController = {
  async getUsers(req: Request, res: Response) {
    const users: Object = await prisma.user.findMany();

    return res.json(users);
  },
  async addUser(req: Request, res: Response) {
    try {
      const userData = req.body;
      const user = await prisma.user.create({
        data: {
          firstName: userData.firstName,
          lastName: userData.lastName,
          email: userData.email,
          password: userData.password,
        }
      });
  
      return res.json({ user });

    } catch (error) {
      res.status(400).json({
        success: false,
        message: 'Missing a required parameter, unable to create user.',
        error: error
      })
    }
  },
  async findUniqueUser(req: Request, res: Response) {
    try {
      const paramEmail: string = req.params.email;

      const uniqueUser = await prisma.user.findUnique({
        where: {
          email: paramEmail,
        }
      });

      if (!uniqueUser) {
        return res.status(404).json({ error: "User not found, check email and try again." });
      }

      return res.json({ uniqueUser: uniqueUser });
    } catch (error) {
      console.error('Error retrieving user', error);
    }
  },
  async updateUser(req: Request, res: Response) {
    const paramEmail: string = req.params.email;
    const newEmail: string = req.body.email;
    const newPassword: string = req.body.password;

    try {
      if (!newEmail && !newPassword) {
        return res.status(400).json({ 
          success: false, 
          message: "Please provide email or password to update",
        });
      };

      const updates: Record<string, any> = {};

      if (newEmail) {
        updates.email = newEmail;
      }

      if (newPassword) {
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        updates.password = hashedPassword;
      }
        
      const updatedUser = await prisma.user.update({
        data: updates,
        where: {
          email: paramEmail,
        },
      });

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
