import 'dotenv/config';
import { PrismaClient } from '@prisma/client'
import supertest, { SuperTest, Test } from 'supertest';

const prisma = new PrismaClient({
  datasources: {
    db: {
      url: process.env.TEST_DATABASE_URL
    },
  }
});

const app =  new (require('../app').App)().server; 
const api: SuperTest<Test> = supertest(app);

beforeAll(async () => {
  await prisma.$connect();
});

afterEach(async () => {
})

afterAll(async () => {
  await prisma.$disconnect();
});

describe('User Controller', () => {
  describe('Get Users', () => {
    describe('given the users table is empty', () => {
      it("should return an empty object", () => {
        
        // this one will either need to be mocked
        // or
        // wait until I figure out how to test against the test dabase

        expect(true).toBe(true);
      })
    }),
    describe('given the users table is not empty', () => {
      it("should return a list of all the users", async () => {
        const response = await api.get("/api/users");

        expect(response.status).toBe(200);
      })
    })
  }),

  describe('Add a User', () => {
    describe('given a new user is being added', () => {
      const testUser = {
        firstName: "Sexy",
        lastName: "Mary",
        email: "test2@gmail.com",
        password: "maryonacross"
      }

      it('should create a new user', async () => {
        const response = await api
          .post("/api/users/add-user")
          .send(testUser);
        
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
  })
})
//   describe('Find a Unique User', () => {
//     describe('given an email address', () => {
//       it('should retrieve the user from the database', async () => {
        
//         // const email = 'dummy@gmail.com';

//         // await supertest(app).get(`/api/users/${email}`).expect(404);
//       })
//     }),
//     describe('given an email that is not in the database', () => {
//       it('should throw an error', () => {
//         expect(true).toBe(true);
//       })
//     })
//   }),
//   describe('Update a User', () => {
//     describe('given a new email for the logged in user', () => {
//       it('should update the email for the user', () => {
//         expect(true).toBe(true);
//       })
//     }),
//     describe('given a new password fo the logged in user', () => {
//       it('should update the password for the user', () => {
//         expect(true).toBe(true);
//       })
//     }),
//     describe('given a new email and a new password', () => {
//       it('should update both the email and password for the user', () => {
//         expect(true).toBe(true);
//       })
//     }),
//     describe('given that no email or password were sent to update', () => {
//       it('should throw an error', () => {
//         expect(true).toBe(true);
//       })
//     })
//   }),
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
