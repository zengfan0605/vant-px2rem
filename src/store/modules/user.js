import { getToken, setToken, removeToken } from '@/utils/auth'
import { login, logout } from '@/api/user'

const state = {
  token: getToken()
}

const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token
  }
}
const actions = {
  Login({ commit }, userInfo) {
    return new Promise((res, rej) => {
      login(userInfo).then(response => {
        const { data } = response
        if(data.code == 200) {
          commit('SET_TOKEN', data.data.token)
          setToken(data.data.token)
          res(data)
        } else {
          commit('SET_TOKEN', '')
          removeToken()
          res(data)
        }
      }).catch(error => {
        rej(error)
      })
    })
  },

  logout({ commit }) {
      return new Promise((resolve, reject) => {
        logout().then(() => {
          commit('SET_TOKEN', '')
          sessionStorage.clear()
          localStorage.clear()
          removeToken()
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
  },

  resetToken({ commit }) {
    return new Promise(resolve => {
      commit('SET_TOKEN', '')
      sessionStorage.clear()
      localStorage.clear()
      removeToken()
      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
