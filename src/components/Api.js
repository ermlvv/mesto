// import { json } from "stream/consumers";

import { data } from "browserslist";

export default class Api {
  constructor(config) {
    this._url = config.url
    this._token = config.token
    this._headers = {
      Authorization: this._token,
      "Content-type": 'application/json',
    }
  }

  _validateResponse(res) {
    if(res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`)
  }

  getUserInfo() {
    return new Promise((resolve, reject) => {
      fetch(`${this._url}/users/me`, {
        method: 'GET',
        headers: this._headers
      })
      .then(this._validateResponse.bind(this))
      .then(data => {
        resolve(data)
      })
  
      .catch(err => {
        console.log(err)
      })
    })
  }

  setUserAvatar(data) {
    return fetch(`${this._url}/users/me/avatar`, {
        method: 'PATCH',
        headers: this._headers,
        body: JSON.stringify({
          avatar: data.userAvatar
        })
      })
      .then(this._validateResponse.bind(this))
  }

  setUserInfo(data) {
  return fetch(`${this._url}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name: data.userName,
        about: data.userAbout
      })
    })
    .then(this._validateResponse.bind(this))
}

  getInitialCards() {
    return fetch(`${this._url}/cards`, {
        method: 'GET',
        headers: this._headers,
      })
      .then(this._validateResponse.bind(this))
    }

  newCard(data) {
    return fetch(`${this._url}/cards`, {
        method: 'POST',
        headers: this._headers,
        body: JSON.stringify({
          name: data.placeName,
          link: data.imageUrl
        })
      })
      .then(this._validateResponse.bind(this))
}

  likeCard(card) {
    return fetch(`${this._url}/cards/${card}/likes`, {
      method: 'PUT',
      headers: this._headers,
  })
  .then(this._validateResponse.bind(this))
}

  dislikeCard(card) {
    return fetch(`${this._url}/cards/${card}/likes`, {
      method: 'DELETE',
      headers: this._headers,
  })
  .then(this._validateResponse.bind(this))
  }

  removeCard(cardId) {
    return fetch(`${this._url}/cards/${cardId}`, {
    method: "DELETE",
    headers: this._headers,
  })
  .then(this._validateResponse.bind(this))
  }
}
