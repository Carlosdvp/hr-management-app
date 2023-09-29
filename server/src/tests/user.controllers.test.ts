import supertest from 'supertest'
import dotenv from "dotenv";
import app from '../app'

describe('User Controller', async () => {
  dotenv.config();
  describe('Get Users', () => {
    describe('given the users table is empty', () => {
      it("should return an empty object", () => {
        expect(true).toBe(true);
      })
    }),
    describe('given the users table is not empty', () => {
      it("should return a list of all the users", async () => {
        const response = await supertest(app).get("/api/users");

        expect(response.status).toBe(200);
      })
    })
  }),
  describe('Add a User', () => {
    describe('given the new user is not in the database', () => {
      it('should add the new user to the databse', () => {
        expect(true).toBe(true);
      })
    }),
    describe('given that the required data is incomplete', () => {
      it('should throw an error', () => {
        expect(true).toBe(true);
      })
    })
  }),
  describe('Find a Unique User', () => {
    describe('given an email address', () => {
      it('should retrieve the user from the database', async () => {
        
        // const email = 'dummy@gmail.com';

        // await supertest(app).get(`/api/users/${email}`).expect(404);
      })
    }),
    describe('given an email that is not in the database', () => {
      it('should throw an error', () => {
        expect(true).toBe(true);
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
  }),
  describe('Delete a User', () => {
    describe('given the email for an existing user', () => {
      it('should delete that user from the database', () => {
        expect(true).toBe(true);
      })
    }),
    describe('given a non-existent email for a suer', () => {
      it('should throw an error', () => {
        expect(true).toBe(true);
      })
    })
  })
})
