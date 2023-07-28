export default class Card {
  constructor({ data, currentId, template, handleCardClick, handleCardRemove, handleCardLike, handleCardDislike} ) {
    this._name = data.name
    this._link = data.link
    this._likes = data.likes
    this._cardId = data._id
    this._currentId = currentId
    this._ownerId = data.owner._id
    this._userId = data
    this._template = template
    this._handleCardClick = handleCardClick
    this._handleCardRemove = handleCardRemove
    this._handleCardLike = handleCardLike
    this._handleCardDislike = handleCardDislike
  }

  _getTemplate() {
    const cardElement = document
    .querySelector(this._template)
    .content
    .querySelector('.element')
    .cloneNode(true);

    return cardElement;
  }

  _checkOwner() {
    if(this._ownerId !== this._currentId) {
      this._buttonRemove.remove()
    }
  } 


    generateCard() {
      this._element = this._getTemplate();
      this._elementImage = this._element.querySelector('.element__image');
      this._buttonLike = this._element.querySelector('.element__like');
      this._buttonRemove = this._element.querySelector('.element__remove');
      this._likeCounter = this._element.querySelector('.element__like-counter');
      this._likeCounter.textContent = this._likes.length;
      this._checkOwner()
      this._setEventListeners();
      this._counterState();
      
      this._element.querySelector('.element__heading').textContent = this._name;
      this._elementImage.src = this._link;
      this._elementImage.alt = this._name;

      return this._element
    }
  
    _counterState() {
      this._likes.forEach(like => {
        if(like._id === this._currentId) {
          console.log('true')
          this._buttonLike.classList.add('element__like_active')
        }
      })
    }

    toggleButton(card) {
      this._likeCounter.textContent = card.likes.length
      this._buttonLike.classList.toggle('element__like_active')
    }

    _likeCard() {

      if(this._buttonLike.classList.contains('element__like_active')) {
        this._handleCardDislike(this)
      } else {
        this._handleCardLike(this)
      }
    }
    
    _handleClickImage() {
      this._handleCardClick(this._link, this._name)
    }
    
    _setEventListeners() {
      this._buttonLike.addEventListener('click', () => {
        this._counterState()
        this._likeCard()
        
      })
      
      this._buttonRemove.addEventListener('click', () => {
        this._handleCardRemove(this._cardId, this._element);
      })
      
      this._elementImage.addEventListener('click', () => {
        this._handleClickImage();
      })
    }
    
    // deleteCard() {
    //   this._element.remove();
    //   this._element = null;
    // }
  }
  
  
  