import template from './login.template'
import TextField from '../view/text-field'
import { getAuthetication, getPost, getProfile } from '../utills/api'
import { handle } from '../constants'
import { isThisTypeNode } from 'typescript'


export default class Login {
  #template = template
  #data = {
    title: '여러 상황을 고려하여 로그인을 한번 구현해봅시다.',
    loginFail: false,
  }
  #fields = []
  #store
  #container
  
  constructor({container, store}) {
    this.#initialize()
    this.#store = store
    this.#container = document.querySelector(container)

    setTimeout(this.#attatchEventListner, 0)
  }

  #attatchEventListner = () => {
    this.#container.addEventListener('submit', this.#onSubmit)
  }

  #initialize = () => {
    const idField = new TextField({
      container: '#login-fields',
      data : {
        id: 'id',
        label: 'ID',
        name: 'ID',
        type: 'text',
        require: true,
        placeholder: '아이디를 입력하세요.'
      }
    })

    const pwField = new TextField({
      container: '#login-fields',
      data : {
        id: 'password',
        label: '비밀번호',
        name: 'password',
        type: 'password',
        require: true,
        placeholder: '비밀번호를 입력하세요.'
      }
    })

    this.#fields.push(idField)
    this.#fields.push(pwField)
  }

  
  #onSubmit = async (e) => {
    e.preventDefault()

    const loginData = this.#fields
      .map(field => ({ [field.name] : field.value }))
      .reduce((a, b) => ({...a, ...b}), {})
    
    const [data, err] = await handle(getAuthetication(loginData))
    if (err) {
      this.#data.loginFail = true
      this.render()
    }

    const [posts, profile] = await Promise.all([getPost(data.result.id, data.result.token), getProfile(data.result.id, data.result.token)])

    this.#store.setProfile(profile)
    this.#store.setPosts(posts)

    location.href = '/#/profile'
  }
  

  render = () => {
    this.#container.innerHTML = this.#template(this.#data)
    this.#fields.forEach((field) => {
      field.render()
    })
  }
}