export default class Card {
  constructor(data, template, openPopup) {
    this._name = data.name
    this._link = data.link
    this._template = template
    this._openPopup = openPopup
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
      this._setEventListeners(this._element);
      this._elementImage = this._element.querySelector('.element__image')

      this._element.querySelector('.element__heading').textContent = this._name;
      this._elementImage.src = this._link;
      this._elementImage.alt = this._name;

      return this._element
    }

    _likeCard() {
      const buttonCardLike = this._element.querySelector('.element__like');
      buttonCardLike.classList.toggle('element__like_active');
    }

    _deleteCard() {
      this._element.remove();
      this._element = null;
    }

    _renderImagePopup() {
      this._openPopup(this._link, this.name)
    }

    _setEventListeners(cardElement) {
      cardElement.querySelector('.element__like').addEventListener('click', () => {
        this._likeCard();
      })

      cardElement.querySelector('.element__remove').addEventListener('click', () => {
        this._deleteCard();
      })

      cardElement.querySelector('.element__image').addEventListener('click', (evt) => {
        this._renderImagePopup(evt);
      })
    }
}


