export default class Card {
  constructor(data, template, handleCardClick) {
    this._name = data.name
    this._link = data.link
    this._template = template
    this._handleCardClick = handleCardClick
  }

  _getTemplate() {
    const cardElement = document
    .querySelector(this._template)
    .content
    .querySelector('.element')
    .cloneNode(true);

    return cardElement;
  }

    generateCard() {
      this._element = this._getTemplate();
      this._elementImage = this._element.querySelector('.element__image');
      this._buttonLike = this._element.querySelector('.element__like');
      this._setEventListeners();

      this._element.querySelector('.element__heading').textContent = this._name;
      this._elementImage.src = this._link;
      this._elementImage.alt = this._name;

      return this._element
    }

    _likeCard() {
      this._buttonLike.classList.toggle('element__like_active');
    }

    _deleteCard() {
      this._element.remove();
      this._element = null;
    }

    _handleClickImage() {
      this._handleCardClick(this._link, this._name)
    }

    _setEventListeners() {
      this._buttonLike.addEventListener('click', () => {
        this._likeCard();
      })

      this._element.querySelector('.element__remove').addEventListener('click', () => {
        this._deleteCard();
      })

      this._elementImage.addEventListener('click', () => {
        this._handleClickImage();
      })
    }
}


