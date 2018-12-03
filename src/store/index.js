import Vue from 'vue'
import Vuex from 'vuex'
// import app from './modules/app'
/*import user from './modules/user'
import permission from './modules/permission'*/

//自定义 TODO
import meituan from "./../Store/modules/meituan";

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    token: ''
  },
  mutations: {

  },
  modules: {
    meituan: meituan  //自定义 TODO
  }
});

export default store
