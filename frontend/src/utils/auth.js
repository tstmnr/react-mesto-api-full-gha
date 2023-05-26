class Auth {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }

    return Promise.reject(`Ошибка: ${res.status}`);
  }

  _request(url, options) {
    return fetch(url, options).then(this._checkResponse)
  }

  checkToken(jwt) {
    return this._request(`${this._baseUrl}/users/me`, {
      method: 'GET',
      headers: {
        ...this._headers,
        Authorization: `Bearer ${jwt}`
      },
      credentials: "include",
    })
  }

  authentication(data) {
    console.log('выводим email и password', data.email, data.password)
    return this._request(`${this._baseUrl}/signin`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        email: data.email,
        password: data.password
      }),
      credentials: "include",
    })
  }

  registration(data) {
    return this._request(`${this._baseUrl}/signup`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        email: data.email,
        password: data.password
      }),
      credentials: "include",
    })
  }

}

const options = {
  baseUrl: 'https://api.tstmnr.nomoredomains.monster',
  headers: {
    'Content-Type': 'application/json'
  },
}

// eslint-disable-next-line import/no-anonymous-default-export
export default new Auth(options);
