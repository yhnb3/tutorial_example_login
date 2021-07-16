import template from './login.template'
import TextField from '../view/text-field'
import { getAuthetication, getPost, getProfile } from '../utills/api'
import { handle } from '../constants'



export default class Login {
  #template = template
  #data = {
    title: '생각보다 간단하지 않은 로그인',
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
    
    try {
      const [data, err] = await handle(getAuthetication(loginData))
      if (err) throw new Error("loginError")

      const [[postData, postErr], [profileData, profileErr]] = await Promise.all([handle(getPost(data.result.id, data.result.token)), handle(getProfile(data.result.id, data.result.token))])

      if (postErr || profileErr) throw new Error("profileError")

      this.#store.setProfile(profileData)
      this.#store.setPosts(postData)

      location.href = '/#/profile'
    } catch(err) {
      if (err.message === "loginError") {
        this.#data.loginFail = true
        this.render()
      } else {
        location.href = '/#/page-not-found'
      }
    }
  }
  

  render = () => {
    this.#container.innerHTML = this.#template(this.#data)
    this.#fields.forEach((field) => {
      field.render()
    })
  }
}