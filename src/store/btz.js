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
    btz: {},
    categories: {},
  },

  mutations:{
    setBtz (state, btz){
      state.btz = btz
    },

    clearBtz(state){
      state.btz = {}
    },

    setCategories(state, categories) {
      state.categories = categories
    },

    clearCategories(state){
      state.categories = {}
    },

    removeCategory(state, index){
      state.categories.delete(index)
    },

    setQuestions(state, questions){
      state.questions = questions
    },

    clearQuestions(state) {
      state.questions = {}
    }

    
  },

  actions:{
    async createBtz({commit}, {name, ze, dateCreated, facultet}) {
      try {
        const uid = localStorage.uId
        const db = getDatabase()
        dateCreated = moment().format('D.MM.Y')
        await push(ref(db, '/users/' + uid + '/btz'), {name, ze, dateCreated, facultet})
      }
      catch(e) {
        commit('setError', e)
        throw(e)
      }
    },

    async deleteBtz({}, id){
      const uid = localStorage.uId
      const db = getDatabase()
      await remove(ref(db, '/users/' + uid + '/btz/' + id))
    },

    fetchBtz({commit}){
      const uid =  localStorage.uId
      const db = getDatabase()
      const btzRef = ref(db, '/users/' + uid + '/btz')
      onValue(btzRef, (snapshot) => {
        const btzInfo = snapshot.val();
        commit('setBtz', Object.keys(btzInfo).map(key => ({...btzInfo[key], id: key })))
      })
    },

    async addCategory({},{btzId, categoryName}){
      const uid =  localStorage.uId
      const db = getDatabase()
      await push(ref(db, '/users/' + uid + '/btz/' + btzId + '/categories'), {categoryName})
    },

    async deleteCategory({}, {btzId, categId}){
      const uid = localStorage.uId
      const db = getDatabase()
      await remove(ref(db, '/users/' + uid + '/btz/' + btzId + '/categories/' + categId))
    },

    async fetchCategories({commit}, {btzId}){
      const uid =  localStorage.uId
      const db = getDatabase()
      const categRef = ref(db, '/users/' + uid + '/btz/' + btzId + '/categories/')
      onValue(categRef, (snapshot) => {
        const categInfo = snapshot.val();
        commit('setCategories', Object.keys(categInfo).map(key => ({...categInfo[key], id: key })))
      })
    },

    async addOpenQuestion({}, {btzId, categId, name, type, text, answer}){
      const uid =  localStorage.uId
      const db = getDatabase()
      await push(ref(db, '/users/' + uid + '/btz/' + btzId + '/categories/' + categId + '/questions'), {name, type, text, answer})
    },

    async addCloseQuestion({},{btzId, categId, name, type, text, answerTrue, answerFalse1, answerFalse2, answerFalse3}){
      const uid = localStorage.uId
      const db = getDatabase()
      await push(ref(db, '/users/' + uid + '/btz/' + btzId + '/categories/' + categId + '/questions'), {name, type, text, answerTrue, answerFalse1, answerFalse2, answerFalse3})
    },

    async fetchQuestions({commit},{btzId,categId}) {
      const uid =  localStorage.uId
      const db = getDatabase()
      const qRef = ref(db, '/users/' + uid + '/btz/' + btzId + '/categories/' + categId + '/questions/')
      onValue(qRef, (snapshot) => {
        const qInfo = snapshot.val();
        commit('setQuestions', Object.keys(qInfo).map(key => ({...qInfo[key], id: key })))
      })
    },

    async deleteQuestion({},{btzId, categId, questionId}){
      const uid = localStorage.uId
      const db = getDatabase()
      await remove(ref(db, '/users/' + uid + '/btz/' + btzId + '/categories/' + categId + '/questions/' + questionId))
    }
      


  },

  getters: {
    btz: s => s.btz,

    getCategories(state){
      state = state.btz
      n = state.find(b => b.id === this.$route.query.id)
      return (n)
    }
  }

}
