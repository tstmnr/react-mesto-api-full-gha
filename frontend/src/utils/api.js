class Api {
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
    return fetch(url, options).then(() => this._checkResponse())
  }

  getInitialCards() {
    return this._request(`${this._baseUrl}/cards`, {
      method: 'GET',
      headers: this._headers,
      credentials: "include",
    });
  }

  getUserInfo() {
    return this._request(`${this._baseUrl}/users/me`, {
      method: 'GET',
      headers: this._headers,
      credentials: "include",
    });
  }

  patchAvatar(data) {
    return this._request(`${this._baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        avatar: data.avatar,
      }),
      credentials: "include",
    })
  }

  patchUserInfo(data) {
    return this._request(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        about: data.about,
      }),
      credentials: "include",
    })
  }

  postCard(data) {
    return this._request(`${this._baseUrl}/cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        link: data.link,
      }),
      credentials: "include",
    })
  }

  deleteCard(card) {
    return this._request(`${this._baseUrl}/cards/${card._id}`, {
      method: 'DELETE',
      headers: this._headers,
    })
  }

  setLike(idCard){
    return this._request(`${this._baseUrl}/cards/${idCard}/likes`, {
      method: 'PUT',
      headers: this._headers,
    })
  }

  deleteLike(idCard){
    return this._request(`${this._baseUrl}/cards/${idCard}/likes`, {
      method: 'DELETE',
      headers: this._headers,
    })
  }

  changeLikeCardStatus(idCard, isLiked) {
    if (isLiked) {
      return this.deleteLike(idCard);
    } else {
      return this.setLike(idCard);
    }
  }
}

const options = {
  baseUrl: 'https://api.tstmnr.nomoredomains.monster',
  headers: {
    'Content-Type': 'application/json',
  },
}

// eslint-disable-next-line import/no-anonymous-default-export
export default new Api(options);
