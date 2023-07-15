import { Request, Response } from "express";
import prisma from "../services/prisma";
import { envs, Client } from "stytch";

const client = new Client({
  project_id: process.env.PROJECT_ID,
  secret: process.env.STYTCH_API_SECRET,
  env: envs.test,
});

export const authController = {
  async registerNewUser(req: Request, res: Response) {
    const userData = req.body;

    try {
      // create the new user in stytch
      const payload = await client.passwords.create({
        email: userData.email,
        password: userData.password,
        session_duration_minutes: 60
      });

      // create the user in the DB using prisma
      const user = await prisma.user.create({
        data: {
          firstName: userData.firstName,
          lastName: userData.lastName,
          email: userData.email,
          password: userData.password,
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
        session_duration_minutes: 60
      })

      return res.json({
        success: true,
        message: 'User logged in successfully',
        token: payload.session_token,
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
      res.json({
        success: false,
        message: 'Someting went wrong, unable to log out.',
        error: error
      })
    }
  },
}
