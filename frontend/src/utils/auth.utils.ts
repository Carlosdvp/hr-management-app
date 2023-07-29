import { createPinia } from 'pinia';
import { useUserDataStore } from '@/store/users';
import { Router } from 'vue-router';

const pinia = createPinia();
const { clearLoggedInUser } = useUserDataStore(pinia);

export const logout = async (router: Router): Promise<void> => {
  const apiCall = await fetch('http://localhost:3330/api/auth/logout', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      session_token: localStorage.getItem('token')
    })
  }).then(apiCall => apiCall.json())

  if (apiCall.success) {
    localStorage.removeItem('token')
    clearLoggedInUser();

    router.push('/login')
  } else {
    alert(apiCall.message)
  }
};
