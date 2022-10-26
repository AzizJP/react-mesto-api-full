export class Api {
  constructor(url) {
    this._url = url;
    this._headers = {
      'Content-Type': 'application/json',
    };
  }

  _getToken = () => localStorage.getItem('token');

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  getInitialCards() {
    return fetch(`${this._url}/cards`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${this._getToken()}`,
      },
    }).then(this._checkResponse);
  }

  addNewCard(title, url) {
    const body = {
      name: title,
      link: url,
    };
    return fetch(`${this._url}/cards`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${this._getToken()}`,
      },
      body: JSON.stringify(body),
    }).then(this._checkResponse);
  }

  deleteCard(cardId) {
    return fetch(`${this._url}/cards/${cardId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${this._getToken()}`,
      },
    }).then(this._checkResponse);
  }

  getProfileInfo() {
    return fetch(`${this._url}/users/me`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${this._getToken()}`,
      },
    }).then(this._checkResponse);
  }

  patchProfileInfo(title, info) {
    const body = {
      name: title,
      about: info,
    };
    return fetch(`${this._url}/users/me`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${this._getToken()}`,
      },
      body: JSON.stringify(body),
    }).then(this._checkResponse);
  }
  patchAvatar(avatarUrl) {
    const body = {
      avatar: avatarUrl,
    };
    return fetch(`${this._url}/users/me/avatar`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${this._getToken()}`,
      },
      body: JSON.stringify(body),
    }).then(this._checkResponse);
  }

  toogleLike(cardId, isLiked) {
    return fetch(`${this._url}/cards/${cardId}/likes`, {
      method: isLiked ? 'DELETE' : 'PUT',
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${this._getToken()}`,
      },
    }).then(this._checkResponse);
  }
}

export const api = new Api('https://api.ajp.mesto.nomoredomains.icu');
