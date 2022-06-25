import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  getAuth,
  getIdToken
} from 'firebase/auth'

import {ref,
        getDatabase,
        set,
} from 'firebase/database'


export default{
  
  actions: {
    
    async login ({dispatch, commit}, {email, password}) {
      try { 
        await signInWithEmailAndPassword(getAuth(),email,password) 
        localStorage.setItem('uId', getAuth().currentUser.uid )
      }
      catch (e) {
        commit('setError', e)
        throw (e)
      }
    },

    async register({dispatch, commit}, {email, password, login}) {
      try {
        await createUserWithEmailAndPassword(getAuth(), email, password)
        localStorage.setItem('uId', getAuth().currentUser.uid)
        const uid = localStorage.uId
        const db = getDatabase()
        await set(ref(db, '/users/' + uid + '/info'),{login})
        
        
      }
      catch (e) {
        commit('setError', e)
        throw e
      }
    },

    async logout ({commit}) {
      await signOut(getAuth())
      commit('clearInfo')
      commit('clearBtz')
      commit('clearCategories')
      localStorage.clear()
    },

    getUid(){
      const user = getAuth().currentUser
      return user.uid
    }
  }
}
