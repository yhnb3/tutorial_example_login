import Login from "./page/login"
import Store from './store'
import Profile from './page/profile'

const store = new Store()
function router () {
  const path = location.hash
  
  switch(path) {
    case '':
    case '#/login':
      const login = new Login({container: '#root', store})
      login.render()
      break
    case '#/profile':
      const profile = new Profile(store)
      profile.render()
      break
  }
}

window.addEventListener('hashchange', router)
document.addEventListener('DOMContentLoaded', router)