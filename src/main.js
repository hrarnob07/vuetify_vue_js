import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import router from './router/router'
import store from './store/store'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import './bootstrap/'
Vue.config.productionTip = false

Vue.use(Vuetify)
import axios from 'axios'
import VueAxios from 'vue-axios'
Vue.use(VueAxios, axios);


axios.defaults.baseURL = 'http://workshop.easyservice.xyz/garage_admin/api/v1/';
//
// axios.defaults.baseURL = 'http://192.168.0.113/garage_soft/api/v1/';
// axios.defaults.baseURL = 'http://localhost/garage_soft/api/v1/';
axios.defaults.headers.common['Authorization'] = 'Bearer ' + "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6ImVhYTg3NjAzZTNkNzI0ZmI3MjMyZjBlYjNiOThhNjUwNzNlNGQxZDc5MWMzYjU0MTY4ZGUxMTdhNTBjOWU4NGM1NzRhODgzYWRlODg0NDY3In0.eyJhdWQiOiIyIiwianRpIjoiZWFhODc2MDNlM2Q3MjRmYjcyMzJmMGViM2I5OGE2NTA3M2U0ZDFkNzkxYzNiNTQxNjhkZTExN2E1MGM5ZTg0YzU3NGE4ODNhZGU4ODQ0NjciLCJpYXQiOjE1NTg1MzkyMDUsIm5iZiI6MTU1ODUzOTIwNSwiZXhwIjoxNTkwMTYxNjA1LCJzdWIiOiIxIiwic2NvcGVzIjpbXX0.nKwLYTBd6v8tHKrEf9dC7-EUTjyZUl3Ki-QIQO8ub26asmLQG3yOEwco49gsCWMWdHygIHJZMfJZoE6G6GBwJLRPwSkxOD8ARIpvmiuJi3wHDNlusBSeTGHPtR-5qlNPoKV3zFO6-PcDQCnmbJhoC1jY6pIVzw0Ud3Uxic2NjU3zyhMLcvfAStTkAxNj9asVQbiMjqHEGrYp4Zq2pVqGDGUqwA7rK75EXOwe2d3Vp5_7S5UZFuwuKEUosIMUfORCXD1_uSeqgHlBh5v8UAxtrLeXgXneTg7hzb9AdAblMqvNrLPiz2NZehFoICxU__cv99FAnZRu1casOdoUHzCabfJOVO5BVfrCyB-Tmf7gNGr8g1E0slAAZ9l1gDIxzAaQ-ZWomEg8VJeBmmLsTykZ80CVIBW0HyK-rTp3ZHoekY8JwDVG2cNGgib2v8pO5ffcGUeCEpq8tT_eVW-joGP_fMXDBS2c8YlAjoigE9EJOUmUe7FVmDpwyhFdlFfvKEytvK1uxtrWOoFdWB1O7tRuleHrSuPnZAC0nkJ0rZevRrKtGj_yUMa0nzG4-S4jXzZchH9PBToe5hPnBB6U2IBjfsAuFZRf9m3n3gN8R0nOizimV30NeTcLgtwzsGVIvjPy0za8XLAnkv3NkvH97dk8XWTubYI647WoXKrI74zeYIo";
axios.defaults.headers.post['Content-Type'] = 'multipart/form-data';



new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
