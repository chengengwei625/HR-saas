import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import app from './modules/app'
import settings from './modules/settings'
import user from './modules/user'

Vue.use(Vuex)

// 在导出的实例中，有两个核心方法：getters 和 modules
const store = new Vuex.Store({
  modules: { // 分模块
    app,
    settings,
    user
  },
  getters
})

export default store
