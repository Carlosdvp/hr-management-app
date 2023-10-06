import { Request, Response } from "express";
import prisma from "../services/prisma";
import bcrypt from 'bcrypt';

const salt = 10;

export const authController = {
  async registerNewUser(req: Request, res: Response) {
    try {
      const userData = req.body;
      const hashedPassword = await bcrypt.hash(userData.password, salt);
      
      const user = await prisma.user.create({
        data: {
          firstName: userData.firstName,
          lastName: userData.lastName,
          email: userData.email,
          password: hashedPassword,
        }
      });

      return res.json({
        success: true,
        message: 'User created successfully',
        user: user
      })
    } catch (error) {
      res.status(400).json({
        success: false,
        message: 'Someting went wrong, unable to create user.',
        error: error
      })
    }
  },
  async userLogin(req: Request, res: Response) {
    try {
      const { email, password } = req.body;

      const user = await prisma.user.findUnique({
        where: {
          email: email,
        }
      })

      if (!user || (user.password != password)) {
        return res.status(400).json({
          success: false,
          message: 'Email or password incorrect.'
        })
      }

      return res.json({
        success: true,
        message: 'User logged in successfully',
        user: user,
      })
    } catch (error) {
      res.json({
        success: false,
        message: 'Someting went wrong, email or password incorrect.',
        error: error
      })
    }
  },
  async userLogout(req: Request, res: Response) {
    const { session_token } = req.body;

    try {
      return res.json({
        success: true,
        message: 'Successfully logged out'
      })
    } catch (error) {

      res.json({
        success: false,
        message: 'Someting went wrong, unable to log out.',
        error: error
      })
    }
  },
}
