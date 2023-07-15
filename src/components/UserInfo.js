export default class userInfo {
 constructor({ name, about }) {
  this._name = document.querySelector(name);
  this._about = document.querySelector(about);
 }
 
 getUserInfo({ name, about }) {
  this._nameInput = document.querySelector(name);
  this._aboutInput = document.querySelector(about);
  this._nameInput.value = this._name.textContent
  this._aboutInput.value = this._about.textContent
    return {
    name: this._name,
    about: this._about
    }
 }

 setUserInfo({ name, about }) { 
  console.log(this._name, this._about)
  this._name.textContent = name
  this._about.textContent = about
 }
}