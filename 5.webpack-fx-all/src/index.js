import App from './App'
import router from './assets/js/router'
require('./assets/js/config/init')
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
