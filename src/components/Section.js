export default class Section {
  constructor({ renderer }, selector) {
    this._renderer = renderer;
    this._container = document.querySelector(selector);
  }

  renderItems(cards) {
    cards.forEach((item) => {
      this._renderer(item)
    });
  }
  
  addItem(item) {
    this._container.append(item)
  }

  setItem(item) {
    this._container.prepend(item)
  }

  removeCard(card) {
    card.remove()
    card = null;
  }
}