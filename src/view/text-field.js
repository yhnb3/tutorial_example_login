import template from './text-field.template'

export default class TextField {
  #template = template
  #data = {}
  #container = ''

  constructor({ container, data }) {
    this.#data = { ...data}
    this.#container = container
  }

  render = () => {
    const container = document.querySelector(this.#container)
    const divFrag = document.createElement('div')
    divFrag.innerHTML = this.#template(this.#data)

    container.appendChild(divFrag.children[0])
  } 
}