import template from './text-field.template'

export default class TextField {
  #template = template
  #data = {}
  #container = ''
  #text = ''

  constructor({ container, data }) {
    this.#data = { ...data}
    this.#container = container

    setTimeout(this.#attatchEventListener, 0)
  }

  #attatchEventListener = () => {
    document.querySelector(this.#container).addEventListener('change', this.#onChange)
  }

  #onChange = (e) => {
    if (e.target.id === this.#data.id) {
      this.#text = e.target.value
    }
  }

  get value() {
    return this.#text
  }

  get name() {
    return this.#data.name
  }

  render = () => {
    const container = document.querySelector(this.#container)
    const divFrag = document.createElement('div')
    divFrag.innerHTML = this.#template(this.#data)

    container.appendChild(divFrag.children[0])
  } 
}