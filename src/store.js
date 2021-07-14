export default class Store {
  #token = ''
  #profile = {}  
  #posts = {}
  
  constructor() {

  }
  setToken(token) {
    this.#token = token
  }

  get token() {
    return this.#token
  }

  setProfile(profile) {
    this.#profile = profile
  }

  get profile(){
    return this.#profile
  }

  setPosts(posts){
    this.#posts = posts
  }

  get posts(){
    return this.#posts
  }
}