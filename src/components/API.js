class API {
  constructor(options) {
    this._url = options.url;
    this._authorization = options.headers.authorization;
    this._content_type = options.headers['Content-Type'];
  }
  getInitialCards() {
    return fetch(`${this._url}/cards`, {
      headers: {
        authorization: this._authorization,
      },
    });
  }

  getUserInfo() {
    return fetch(`${this._url}/users/me`, {
      headers: {
        authorization: this._authorization,
      },
    });
  }
  setUserInfo(userInfo) {
    return fetch(`${this._url}/users/me`, {
      method: 'PATCH',
      headers: {
        authorization: this._authorization,
        'Content-Type': this._content_type,
      },
      body: JSON.stringify({
        name: userInfo.name,
        about: userInfo.about,
      }),
    });
  }
  setUserAvatar(avatarLink) {
    return fetch(`${this._url}/users/me/avatar`, {
      method: 'PATCH',
      headers: {
        authorization: this._authorization,
        'Content-Type': this._content_type,
      },
      body: JSON.stringify({
        avatar: `${avatarLink}`,
      }),
    });
  }
  addCard(cardInfo) {
    return fetch(`${this._url}/cards`, {
      method: 'POST',
      headers: {
        authorization: this._authorization,
        'Content-Type': this._content_type,
      },
      body: JSON.stringify({
        name: cardInfo.name,
        link: cardInfo.link,
      }),
    });
  }
  deleteCard(cardID) {
    return fetch(`${this._url}/cards/${cardID}`, {
      method: 'DELETE',
      headers: {
        authorization: this._authorization,
        'Content-Type': this._content_type,
      },
    });
  }
  likeCard(cardID) {
    return fetch(`${this._url}/cards/${cardID}/likes`, {
      method: 'PUT',
      headers: {
        authorization: this._authorization,
      },
    });
  }
  dislikeCard(cardID) {
    return fetch(`${this._url}/cards/${cardID}/likes`, {
      method: 'DELETE',
      headers: {
        authorization: this._authorization,
      },
    });
  }

  changeLikeCardStatus(cardID, isLike)  {
    if(isLike){
      return this.dislikeCard(cardID)
    }
    else {
      return this.likeCard(cardID)
    }
  };
}

export const api = new API({
  url: 'https://mesto.nomoreparties.co/v1/cohort-24',
  headers: {
    authorization: '4efae440-5715-4ca9-8417-962742ac588e',
    'Content-Type': 'application/json',
  },
});
