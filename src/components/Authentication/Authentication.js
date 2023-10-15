import { transport } from '../../utils/constants';

class Authentication {
  constructor(BASE_URL) {
    this._BASE_URL = BASE_URL;
  }

  async registration(email, password) {
    return await transport(`${this._BASE_URL}/signup`, { method: 'POST' }, { email, password });
  }

  async login(email, password) {
    return await transport(`${this._BASE_URL}/signin`, { method: 'POST' }, { email, password });
  }

  logout() {
    localStorage.removeItem('token');
  }
}

export const auth = new Authentication('https://auth.nomoreparties.co');
