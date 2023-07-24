import { Request, Response } from "express";
import prisma from "../services/prisma";
import { envs, Client } from "stytch";
import bcrypt from 'bcrypt';

const client = new Client({
  project_id: process.env.PROJECT_ID,
  secret: process.env.STYTCH_API_SECRET,
  env: envs.test,
});

const salt = 10;

export const authController = {
  async registerNewUser(req: Request, res: Response) {
    const userData = req.body;

    const hashedPassword = await bcrypt.hash(userData.password, salt);

    try {
      // create the new user in stytch
      const payload = await client.passwords.create({
        email: userData.email,
        password: userData.password,
        session_duration_minutes: 480
      });

      // create the user in the DB using prisma
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
        token: payload.session_token,
        user: user
      })
    } catch (error) {
      res.json({
        success: false,
        message: 'Someting went wrong, unable to create user.',
        error: error
      })
    }
  },
  async userLogin(req: Request, res: Response) {
    const { email, password } = req.body;

    try {
      const payload = await client.passwords.authenticate({
        email,
        password,
        session_duration_minutes: 480
      })

      const user = await prisma.user.findUnique({
        where: {
          email: email,
        }
      })

      if (!user) {
        return res.json({
          success: false,
          message: 'Email or password incorrect.'
        })
      }

      const isPasswordValid = await bcrypt.compare(password, user.password);

      if (!isPasswordValid) {
        return res.json({
          success: false,
          message: 'Email or password incorrect.'
        })
      }

      return res.json({
        success: true,
        message: 'User logged in successfully',
        token: payload.session_token,
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
  async authenticateToken(req: Request, res: Response) {
    const { session_token } = req.body;

    try {
      await client.sessions.authenticate({ session_token })

      return res.json({
        success: true,
        message: 'Token is valid'
      })
    } catch (error) {
      res.json({
        success: false,
        message: 'Invalid session token.',
        error: error
      })
    }
  },
  async userLogout(req: Request, res: Response) {
    const { session_token } = req.body;

    try {
      await client.sessions.revoke({ session_token })

      return res.json({
        success: true,
        message: 'Successfully logged out'
      })
    } catch (error) {
      console.error('Logout error', error);
      res.json({
        success: false,
        message: 'Someting went wrong, unable to log out.',
        error: error
      })
    }
  },
}
