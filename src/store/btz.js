import { getAuth } from 'firebase/auth'
import {
  ref,
  getDatabase,
  set,
  push,
  onValue, 
  
} from 'firebase/database'

export default{

  state: {
    btz: {}
  },

  mutations:{
    setBtz (state, btz){
      state.btz = btz
    },

    clearBtz(state){
      state.btz = {}
    }
  },

  actions:{
    async createBtz({commit}, {name, ze}) {
      try {
        const uid =  getAuth().currentUser.uid 
        const db = getDatabase()
        const id = Date.now()
        await push(ref(db, '/users/' + uid + '/btz'), {name, ze})
      }
      catch(e) {
        commit('setError', e)
        throw(e)
      }
    },

    async fetchBtz({commit}){
      const uid =  getAuth().currentUser.uid 
      const db = getDatabase()
      const btzRef = ref(db, '/users/' + uid + '/btz')
      onValue(btzRef, (snapshot) => {
        const btzInfo = snapshot.val();
        commit('setBtz', Object.keys(btzInfo).map(key => ({...btzInfo[key], id: key })))
      })
    }
  },

  getters: {
    btz: s => s.btz
  }

}
