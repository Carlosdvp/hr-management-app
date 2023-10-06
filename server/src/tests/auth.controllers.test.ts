import 'dotenv/config';
import supertest, { SuperTest, Test } from 'supertest';
import prisma from '../services/prisma';

const app =  new (require('../app').App)().server; 
const api: SuperTest<Test> = supertest(app);

interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  createdAt: string;
}

const testUsers = {
  testUserOne: {
    firstName: "Holy",
    lastName: "Mary",
    email: "dear-goddess@gmail.com",
    password: "maryonacross"
  },
  testUserTwo: {
    firstName: "Dark",
    lastName: "Prince",
    email: "prince@gmail.com",
    password: "theDarkPrince"
  },
}

beforeAll(async () => {});

afterEach(async () => {
  await prisma.user.deleteMany({});
})

afterAll(async () => {});

describe('Auth Controllers', () => {
  describe('registerNewUser', () => {
    describe('given the correct data', () => {
      it('should create a new user',  async () => {
        const response = await api
          .post("/api/auth/register")
          .send(testUsers.testUserOne);

        expect(response.status).toBe(200);
        expect(response.body.user.id).toBeDefined();
      })
    }),
    describe('given incomplete data', () => {
      it('should throw an error', async () => {
        const incompleteUser = {
          firstName: "Holy",
          lastName: "Mary",
        }

        const response = await api
          .post("/api/auth/register")
          .send(incompleteUser);

        expect(response.status).toBe(400);
        expect(response.body.message).toBe("Someting went wrong, unable to create user.");
      })
    })
  }),
  describe('userLogin', () => {
    let user: User | undefined;

    beforeEach(async () => {
      const response = await api.post("/api/auth/register").send(testUsers.testUserOne);

      user = await response.body.user;
    })

    describe('given the correct email and password', () => {
      it('should allow the user to log in', async () => {
        const userEmail = user?.email;
        const userPassword = user?.password;
        const payload = {
          email: userEmail,
          password: userPassword
        }

        const loginResponse = await api.post("/api/auth/login").send(payload);

        expect(loginResponse.status).toBe(200);
        expect(loginResponse.body.message).toBe('User logged in successfully');
      })
    }),
    describe('given the wrong credentials', () => {
      it('should throw an error for an incorrect email', async () => {
        const wrongUserEmail = 'wrong@email.com';

        const payload = {
          email: wrongUserEmail,
          password: user?.password
        }

        const loginResponse = await api.post("/api/auth/login").send(payload);
        expect(loginResponse.status).toBe(400);
      }),
      it('should throw an error for an incorrect password', async () => {
        const wrongUserPassword = '12345';

        const payload = {
          email: user?.email,
          password: wrongUserPassword
        }

        const loginResponse = await api.post("/api/auth/login").send(payload);
        expect(loginResponse.status).toBe(400);
      })
    })
  }),
  describe('userLogout', () => {
    describe('given the correct api call from the UI', () => {
      it('should let the user log out',  () => {
        expect(true).toBe(true);
      })
    }),
    describe('given the user is unable to log out', () => {
      it('should throw an error',  () => {
        expect(true).toBe(true);
      })
    })
  })
})
