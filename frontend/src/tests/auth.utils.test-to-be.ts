import { logout } from '@/utils/auth.utils';
import { describe, expect, it } from 'vitest';

describe('logout', () => {
  // Successfully logs out user and removes token from localStorage
  it('should remove token from localStorage when successfully logging out',   async () => {
    // Mock the fetch function
    const mockFetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue({ success: true })
    });
    global.fetch = mockFetch;

    // Mock the localStorage.removeItem function
    const mockRemoveItem = jest.fn();
    Object.defineProperty(window, 'localStorage', {
      value: {
        getItem: jest.fn().mockReturnValue('token'),
        removeItem: mockRemoveItem
      },
      writable: true
    });

    // Mock the clearLoggedInUser function
    const mockClearLoggedInUser = jest.fn();
    const mockUseUserDataStore = jest.fn().mockReturnValue({
      clearLoggedInUser: mockClearLoggedInUser
    });
    jest.mock('@/store/users', () => ({
      useUserDataStore: mockUseUserDataStore
    }));

    // Mock the router.push function
    const mockRouterPush = jest.fn();
    const mockRouter = {
      push: mockRouterPush
    };

    // Call the logout function
    await logout(mockRouter);

    // Assertions
    expect(mockFetch).toHaveBeenCalledWith('http://localhost:3330/api/auth/logout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        session_token: 'token'
      })
    });
    expect(mockRemoveItem).toHaveBeenCalledWith('token');
    expect(mockClearLoggedInUser).toHaveBeenCalled();
    expect(mockRouterPush).toHaveBeenCalledWith('/login');
  });
})