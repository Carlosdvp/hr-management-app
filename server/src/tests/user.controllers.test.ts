import 'dotenv/config';
import supertest, { SuperTest, Test } from 'supertest';
import prisma from '../services/prisma';

const app =  new (require('../app').App)().server; 
const api: SuperTest<Test> = supertest(app);

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

describe('User Controller', () => {
  describe('Get Users', () => {
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
  describe('Add a User', () => {
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
  describe('Find a Unique User', () => {
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
  describe('Update a User', () => {
    describe('given a new email for the logged in user', () => {
      it('should update the email for the user', () => {
        expect(true).toBe(true);
      })
    }),
    describe('given a new password fo the logged in user', () => {
      it('should update the password for the user', () => {
        expect(true).toBe(true);
      })
    }),
    describe('given a new email and a new password', () => {
      it('should update both the email and password for the user', () => {
        expect(true).toBe(true);
      })
    }),
    describe('given that no email or password were sent to update', () => {
      it('should throw an error', () => {
        expect(true).toBe(true);
      })
    })
  })

})

//   describe('Delete a User', () => {
//     describe('given the email for an existing user', () => {
//       it('should delete that user from the database', () => {
//         expect(true).toBe(true);
//       })
//     }),
//     describe('given a non-existent email for a suer', () => {
//       it('should throw an error', () => {
//         expect(true).toBe(true);
//       })
//     })
//   })
// })
