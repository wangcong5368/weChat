/**
 * 方法的统一出口
 */
import Vue from 'vue'
import Vuex from 'vuex'
import userpc from './userpc.js' //PC用户

Vue.use(Vuex)

const utils = new Vuex.Store({
  modules: {
    userpc
  },
})

export default utils