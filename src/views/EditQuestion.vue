<template>
  <div class="page-title">
    <a class="btn btn-floating purple darken-4" @click='this.$router.go(-1)'>
      <i class="material-icons">arrow_back</i>
    </a>
  </div>

  <div class="row">
    <div class="col s10 offset-s1">
      <div class="card">
        <div class="card-content">
          <span class='card-title'>Редактирование вопроса</span>
          <p v-if='questionData.type === "open"'>[Открытый вопрос]</p>
          <p v-if='questionData.type === "close"'>[Закрытый вопрос]</p>
          
          <div class="page-title">
          </div>
          
          <div class="input-field">
            <label for="textarea">Текст вопроса</label>
            <textarea id='textarea'  class='materialize-textarea' v-model='questionData.text' :class="{invalid : v$.questionData.text.required.$invalid }"></textarea>
            <span v-if='v$.questionData.text.required.$invalid' class="helper-text invalid">Поле нельзя оставлять пустым</span>
          </div>
          <div class="input-field" v-if='questionData.type === "open"'>
            <input type='text' id='answer' v-model='questionData.answer' :class="{invalid : v$.questionData.answer.required.$invalid }">
            <label for="answer">Ответ</label>
            <span v-if='v$.questionData.answer.required.$invalid' class="helper-text invalid">Поле нельзя оставлять пустым</span>
          </div>
          <div class="close-type" v-if='questionData.type === "close"'>
            <div class="input-field">
              <input type='text' id='closeTrue' v-model='questionData.answerTrue' :class="{invalid : v$.questionData.answerTrue.required.$invalid }">
              <label for="closeTrue">Правильный ответ</label>
              <span v-if='v$.questionData.answerTrue.required.$invalid' class="helper-text invalid">Поле нельзя оставлять пустым</span>
            </div>
            <div class="input-field">
              <input type='text' id='closeFalse1' v-model='questionData.answerFalse1' :class="{invalid : v$.questionData.answerFalse1.required.$invalid }">
              <label for="closeFalse1">Неправильный ответ</label>
              <span v-if='v$.questionData.answerFalse1.required.$invalid' class="helper-text invalid">Поле нельзя оставлять пустым</span>
            </div>
            <div class="input-field">
              <input type='text' id='closeFalse2' v-model='questionData.answerFalse2' :class="{invalid : v$.questionData.answerFalse2.required.$invalid }">
              <label for="closeFalse2">Неправильный ответ</label>
              <span v-if='v$.questionData.answerFalse2.required.$invalid' class="helper-text invalid">Поле нельзя оставлять пустым</span>
            </div>
            <div class="input-field">
              <input type='text' id='closeFalse3' v-model='questionData.answerFalse3' :class="{invalid : v$.questionData.answerFalse3.required.$invalid }">
              <label for="closeFalse3">Неправильный ответ</label>
              <span v-if='v$.questionData.answerFalse3.required.$invalid' class="helper-text invalid">Поле нельзя оставлять пустым</span>
            </div>
          </div>
           <div class="card-actions">
            <div class="right">
              <a class="btn btn-floating  purple darken-4" @click="saveChanges">
               <i class="material-icons">save</i>
              </a>
              &nbsp;
              <a class="btn btn-floating  pink darken-1 " @click='this.$router.go(-1)'>
                <i class="material-icons">cancel</i>
              </a>
            </div>
          </div>
        </div>
       
      </div>
    </div>
  </div>
  
</template>

<script>
import useVuelidate  from '@vuelidate/core'
import {required, minLength} from '@vuelidate/validators'
export default {

  setup () {
    return { v$: useVuelidate() }
  },

  data () {
    return{
      questionText: '',
      questionData: {},
    }
  },

  validations(){
    return{
      questionData: {
        text : {required, $lazy: true},
        answer: {required, $lazy: true},
        answerTrue: {required, $lazy: true},
        answerFalse1: {required, $lazy: true},
        answerFalse2: {required, $lazy: true},
        answerFalse3: {required, $lazy: true},
      }
    }
  },

  beforeMount(){
      this.questionData = this.$store.state.btz.questions.find(q => q.id === this.$route.query.q_id)
      this.questionText = this.questionData.text
      
  },

  mounted(){
    M.updateTextFields()
   
  },

  methods: {
    saveChanges(){
      
      if (this.questionData.type === 'close'){
        this.v$.$validate()
        if (this.v$.questionData.text.required.$invalid || this.v$.questionData.answerTrue.required.$invalid || this.v$.questionData.answerFalse1.required.$invalid || this.v$.questionData.answerFalse2.required.$invalid || this.v$.questionData.answerFalse3.required.$invalid){
          console.log('INCORRECT DATA')
          return
        }
        console.log('CORRECT DATA')
        this.$store.dispatch('EditCloseQuestion', {btzId: this.$route.query.btz_Id, categId: this.$route.query.categ_Id, questionId: this.$route.query.q_id, text: this.questionData.text, answerTrue: this.questionData.answerTrue, answerFalse1: this.questionData.answerFalse1, answerFalse2: this.questionData.answerFalse2, answerFalse3: this.questionData.answerFalse1})
        this.$message('Вопрос успешно обновлен')
        this.$router.go(-1)
        return
      }

      if (this.questionData.type === 'open'){
        this.v$.$validate()
        if (this.v$.questionData.text.required.$invalid || this.v$.questionData.answer.required.$invalid){
          console.log('INCORRECT DATA')
          return
        }
        this.$store.dispatch('EditOpenQuestion', {btzId: this.$route.query.btz_Id, categId: this.$route.query.categ_Id, questionId: this.$route.query.q_id, answer: this.questionData.answer, text: this.questionData.text})
        this.$message('Вопрос успешно обновлен')
        this.$router.go(-1)
        return
      }
      
    }
  }
}
</script>
