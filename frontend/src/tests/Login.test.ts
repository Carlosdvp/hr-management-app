import { expect, describe, it } from 'vitest'
import { render, screen } from '@testing-library/vue'
import { rest } from "msw";
import { setupServer } from "msw/node";
import { loginResponseSuccess, loginFailedResponse } from "./mockLoginResponses.ts";
import "whatwg-fetch";
import Login from '@/components/Login.vue'
import { createPinia, setActivePinia } from 'pinia';
import { useUserDataStore } from '@/store/users'

const pinia = createPinia();
setActivePinia(pinia);

const testUser = {
  id: "clnev5za00000uxnw2j0gtd99",
  firstName: "Lilith",
  lastName: "Power",
  email: "lilitu@gmail.com",
  password: "bigtits",
  createdAt: "2023-10-06T17:11:53.297Z"
}

export const restHandlers = [
  rest.post("http://localhost:3330/api/auth/login'", (req, res, ctx) => {
    const { email, password } = req.body;

    if (email === testUser.email && password === testUser.password) {
      return res(ctx.status(200), ctx.json(loginResponseSuccess));
    } else {
      return res(ctx.status(400), ctx.json(loginFailedResponse));
    }
  })
];
const server = setupServer(...restHandlers);

// Start server before all tests
beforeAll(() => server.listen({ onUnhandledRequest: "error" }));

//  Close server after all tests
afterAll(() => server.close());

// Reset handlers after each test `important for test isolation`
afterEach(() => server.resetHandlers());

describe('Login', () => {
  it('submits the form and redirects on successful login', async () => {
    // Arrange
    const headerTitle = 'HR Management App';

    // Act: Fill in the email and password inputs
    const { getByText } = render(Login);

    // Assert
    expect(getByText(headerTitle)).toBeTruthy();
  })
})
