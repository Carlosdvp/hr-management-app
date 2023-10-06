import 'dotenv/config';
import supertest, { SuperTest, Test } from 'supertest';
import prisma from '../services/prisma';
import bcrypt from 'bcrypt';

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

afterEach(async () => {
  await prisma.user.deleteMany({});
})

describe('User Controllers', () => {
  describe('getUsers', () => {
    describe('given the users table is empty', () => {
      beforeEach(async () => {
        await prisma.user.deleteMany({});
      });

      it("should return an empty array", async () => {
        const response = await api.get("/api/users");

        expect(response.body).toEqual([]);
      })
    }),
    describe('given the users table is not empty', () => {
      it("should return a list of all the users", async () => {
        await api
          .post("/api/users/add-user")
          .send(testUsers.testUserOne);
        await api
          .post("/api/users/add-user")
          .send(testUsers.testUserTwo);
      
        const response = await api.get("/api/users");

        expect(response.status).toBe(200);
        expect(response.body).toHaveLength(2);
      })
    })
  }),
  describe('addUser', () => {
    describe('given a new user is being added', () => {
      it('should create a new user', async () => {
        const response = await api
          .post("/api/users/add-user")
          .send(testUsers.testUserTwo);
        
        expect(response.status).toBe(200);
        expect(response.body.user.id).toBeDefined();
      })
    }),
    describe('given that the required data is incomplete', () => {
      const testUser2 = {
        firstName: "Sexy",
        lastName: "Mary",
        email: "test5@gmail.com"
      }

      it('should throw an error', async () => {
        const response = await api
          .post("/api/users/add-user")
          .send(testUser2);
        
        expect(response.status).toBe(400);
        expect(response.body.success).toBe(false);
      })
    })
  }),
  describe('findUniqueUser', () => {
    describe('given an email address', () => {
      it('should retrieve the user from the database', async () => {
        
        const response = await api.post("/api/users/add-user").send(testUsers.testUserOne);
        const { email } = await response.body.user;
        const findUniqueUserResponse = await api.get(`/api/users/${email}`);

        expect(findUniqueUserResponse.status).toBe(200);
        expect(findUniqueUserResponse.body.uniqueUser.email).toBe(email);
      })
    }),
    describe('given an email that is not in the database', () => {
      it('should throw an error', async () => {

        const dummyEmail = 'dumdum@getMaxListeners.com';
        const findUniqueUserResponse = await api.get(`/api/users/${dummyEmail}`);

        expect(findUniqueUserResponse.status).toBe(404);
      })
    })
  }),
  describe('updateUser', () => {
    let user: User | undefined;

    beforeEach(async () => {
      const response = await api.post("/api/users/add-user").send(testUsers.testUserOne);

      user = await response.body.user;
    })
    describe('given a new email for the logged in user', () => {    
      it('should update the email for the user', async () => {
        const updatedEmail = 'newemail@gmail.com';
        const updateResponse = await api.put(`/api/users/${user?.email}`).send({
          email: updatedEmail
        });

        const getUpdatedUser = await api.get(`/api/users/${updatedEmail}`);

        expect(updateResponse.status).toBe(200);
        expect(getUpdatedUser.body.uniqueUser.email).toBe(updatedEmail);
      })
    }),
    describe('given a new password fo the logged in user', () => {
      it('should update the password for the user', async () => {
        const updatedPassword = '12345';
        const updateResponse = await api.put(`/api/users/${user?.email}`).send({
          password: updatedPassword
        });

        const getUpdatedUser = await api.get(`/api/users/${user?.email}`);
        const passwordMatches = await bcrypt.compare(updatedPassword, getUpdatedUser.body.uniqueUser.password);

        expect(updateResponse.status).toBe(200);
        expect(passwordMatches).toBe(true);
      })
    }),
    describe('given a new email and a new password', () => {
      it('should update both the email and password for the user', async () => {
        const updatedEmail = 'newemail@gmail.com';
        const updatedPassword = '12345';
        const updateResponse = await api.put(`/api/users/${user?.email}`).send({
          email: updatedEmail,
          password: updatedPassword
        });

        const getUpdatedUser = await api.get(`/api/users/${updatedEmail}`);
        const passwordMatches = await bcrypt.compare(updatedPassword, getUpdatedUser.body.uniqueUser.password);

        expect(updateResponse.status).toBe(200);
        expect(getUpdatedUser.body.uniqueUser.email).toBe(updatedEmail);
        expect(passwordMatches).toBe(true);
      })
    }),
    describe('given that no email or password were sent to update', () => {
      it('should throw an error', async () => {
        const updateResponse = await api.put(`/api/users/${user?.email}`).send({});

        expect(updateResponse.status).toBe(400);
        expect(updateResponse.body.success).toBe(false);
      })
    })
  }),
  describe('deleteUser', () => {
    let user: User | undefined;

    beforeEach(async () => {
      const response = await api.post("/api/users/add-user").send(testUsers.testUserOne);

      user = await response.body.user;
    })
    describe('given the email for an existing user', () => {
      it('should delete that user from the database', async () => {
        const userId = user?.id;
        const deleteUserResponse = await api.delete(`/api/users/${userId}`);

        expect(deleteUserResponse.status).toBe(200);
        expect(deleteUserResponse.body.deletedUser.id).toBe(userId);
      })
    }),
    describe('given an incorrect id to delete a user', () => {
      it('should throw an error', async () => {
        const deleteUserWrongId = await api.delete(`/api/users/123`);

        expect(deleteUserWrongId.status).toBe(400);
        expect(deleteUserWrongId.body.message).toBe("Failed to delete user");
      })
    }),
    describe('given a non-existent or incorrect id to delete a user', () => {
      it('should throw an error', async () => {
        const emptyId = '';
        const deleteUserWithNoId = await api.delete(`/api/users/${emptyId}`);

        expect(deleteUserWithNoId.status).toBe(404);
      })
    })
  })
})
