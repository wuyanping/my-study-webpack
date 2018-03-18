import App from './App'
import router from './assets/js/router'
import './assets/js/config/init'
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
