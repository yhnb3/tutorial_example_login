import Login from "./page/login";

export default class App {
  constructor() {
    const login = new Login()
    login.render()
  }
}