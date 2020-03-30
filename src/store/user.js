import Vue from 'vue'
import { getUserInfo } from '@/api/login'
const TIMEOUT = 30 * 60 * 60 * 24 // 登录超时时间 30天
let ck = ''
const state = {
  uid: null,
  ck: '',
  username: '',
  aaa: 1
  //   expiredate: null,
  //   mobile: null,
  //   storename: null,
  //   uname: null,
  //   wxno: null,
  //   wxqrcode: null,
}

const getters = {

}

const mutations = {
  setInfo (state, payload) {
    for (const key in payload) {
      if (Object.prototype.hasOwnProperty.call(payload, key)) {
        state[key] = payload[key]
      }
    }
  }
}

const actions = {

  setInfo ({ commit }, info) {
    ck = info.ck
    // Vue.Storage.set('ck', ck, TIMEOUT)
    Vue.Cookie.set('ck', ck, TIMEOUT)
    commit('setInfo', info)
  },
  async checkLogin ({ commit }) {
    // 判断是否登录，没登录直接返回
    const ck = Vue.Cookie.get('ck')

    if (!ck) return state
    // 如果有ck但是state为空就重新拉一下,根据需求判断登录态是否过期
    if (!state.username) {
      const info = await getUserInfo()
      commit('setInfo', {
        ck,
        ...info
      })
    }
    // 判断登录态是否过期
    // const info = Vue.Storage.get('ck')
    // if (info) {
    //   Vue.Storage.set('ck', info, TIMEOUT)
    //   commit('setInfo', info)
    // } else {
    //   Vue.Cookie.del('ck')
    // }
    return state
  }

  // 延长登录态
//   goInfo ({ commit, dispatch }) {
//     const info = Vue.Storage.get(ck)
//     if (info) {
//       dispatch('setInfo', info)
//     } else {
//       commit('logout')
//     }
//   },
//   logout ({ commit }) {
//     if (ck) {
//       Vue.Storage.del(ck)
//       commit('setInfo', { ck: '' })
//     }
//     Vue.Cookie.del('ck')
//   }
}
export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
