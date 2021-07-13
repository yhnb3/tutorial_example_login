import template from './login.template'
import TextField from '../view/text-field'
import { getAuthetication, getPost, getProfile } from '../utills/api'
import axios from 'axios'

export default class Login {
  #template = template
  #data = {
    title: '여러 상황을 고려하여 로그인을 한번 구현해봅시다.',
  }
  #fields = []

  constructor() {
    this.#initialize()

    setTimeout(this.#attatchEventListner, 0)
  }

  #attatchEventListner = () => {
    document.querySelector('#root').addEventListener('submit', this.#onSubmit)
  }

  #initialize = () => {
    const idField = new TextField({
      container: '#login-fields',
      data : {
        id: 'id',
        label: 'ID',
        name: 'ID',
        type: 'text',
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
    
    const result = await getAuthetication(loginData)
    // const posts = await getPost(id, token)
    // const profile = await getProfile(id, token)
    // console.log(posts, profile)
    
  }
  

  render = () => {
    document.querySelector('#root').innerHTML = this.#template(this.#data)
    this.#fields.forEach((field) => {
      field.render()
    })
  }
}