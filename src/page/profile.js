import template from './profile.template'

export default class Profile {
  #template = template
  #data = {}
  #container = undefined
  #store = undefined

  constructor(store) {
    this.#container = document.querySelector('#root')
    this.#store = store
    this.#data = {
      userProfile: this.#store.profile,
      posts: this.#store.posts
    }
  
  }

  render = () => {
    this.#container.innerHTML = this.#template(this.#data)
  }
}