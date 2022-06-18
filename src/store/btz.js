import { getAuth } from 'firebase/auth'
import {
  ref,
  getDatabase,
  set,
  push,
  onValue,
  remove
  
} from 'firebase/database'

import moment from 'moment'

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
    },

    
  },

  actions:{
    async createBtz({commit}, {name, ze, dateCreated}) {
      try {
        const uid =  getAuth().currentUser.uid 
        const db = getDatabase()
        dateCreated = moment().format('D.MM.Y')
        await push(ref(db, '/users/' + uid + '/btz'), {name, ze, dateCreated})
      }
      catch(e) {
        commit('setError', e)
        throw(e)
      }
    },

    async deleteBtz({}, id){
      const uid = getAuth().currentUser.uid
      const db = getDatabase()
      console.log('/users/' + uid + '/btz/' + id)
      await remove(ref(db, '/users/' + uid + '/btz/' + id))
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
