import { get } from 'axios';

let currentUser;

export function fetchProviders () {
  return get('/auth/providers');
}

export function fetchCurrentUser () {
  if (currentUser) {
    return Promise.resolve(currentUser);
  } else {
    return get('/auth/me').then(resp => {
      currentUser = resp.data;
      return resp;
    });
  }
}

// TODO: Get replace working
export function authenticate (nextState, replace) {
  return fetchCurrentUser().catch(() => {
    // replace('/'); should work
    window.location.href = '/';
  });
}
