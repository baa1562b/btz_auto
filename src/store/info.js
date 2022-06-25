import { getAuth } from 'firebase/auth'
import {
  ref,
  getDatabase,
  set,
  onValue
} from 'firebase/database'

export default {
  state: {
    userInfo: {}

  },

  mutations: {
    setInfo(state, info) {
      state.userInfo = info
    },

    clearInfo(state) {
      state.userInfo = {}
    }
  },

  actions: {
     fetchInfo({commit}) {
      const uid =  localStorage.uId 
      const db = getDatabase()
      const infoRef = ref (db, '/users/' + uid + '/info')
      onValue(infoRef, (snapshot) => {
        const info = snapshot.val();
        commit('setInfo', info)
      });
    },
  },

  getters: {
    info: s => s.userInfo
  }

}
