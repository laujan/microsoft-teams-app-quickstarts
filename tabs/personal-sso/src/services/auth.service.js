import SSOAuthService from "./sso.auth.service";

class AuthService {
  constructor() {
    this.authService = new SSOAuthService();
  }

  isCallback() {
    return this.authService.isCallback(window.location.hash);
  }

  login() {
    return this.authService.login();
  }

  logout() {
    this.authService.logout();
  }

  getToken() {
    return this.authService.getToken();
  }

  getUser() {
    return this.authService.getUser();
  }

  // Does an authenticated fetch by acquiring and appending the Bearer token for our backend
  fetch(url, options) {
    return this.getToken().then(token => {
      options = options || {};
      options.headers = options.headers || {};
      options.headers.Authorization = `Bearer ${token}`;
      return fetch(url, options);
    });
  }
}

export default new AuthService();