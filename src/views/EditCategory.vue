<template>
<div class="page-title">
  <a class="btn btn-floating purple darken-4" @click='this.$router.go(-1)'>
    <i class="material-icons">arrow_back</i>
  </a>
</div>
<section>
  <div class="row" v-if='JSON.stringify(this.$store.state.btz.questions) === "{}"'>
    <div class="col s6 offset-s3" ><h5>В ЭТОЙ КАТЕГОРИИ ПОКА НЕТ ВОПРОСОВ</h5></div>
  </div>

    <div class="fixed-action-btn">
    <a  class=" btn btn-floating btn-large purple darken-4 tooltipped modal-trigger" href='#modal' ref ='tooltip' data-position="left" data-tooltip='Добавить вопрос'>
      <i class="large material-icons">add</i>
    </a>
  </div>

  
  <div class="row" v-for='(q,i) in this.$store.state.btz.questions' :key='i'>
    <div class="col s10 offset-s1">
      <div class="card">
        <div class="card-content">
          <span class="card-title"><h5>Вопрос #{{i+1}}</h5>({{q.type}})</span>
          <p>{{q.text}}</p>
          <div class="page-title">
          </div>

          <div v-if='q.type === "open"'>
            <div class="chip light-green darken-1 white-text">
            {{q.answer}}
            </div>
          </div>

          <div v-if='q.type === "close"'>
            <div class="answer">
              <div class="chip light-green darken-1 white-text">
                {{q.answerTrue}}
              </div>
            </div>

            <div class="answer">
              <div class="chip pink darken-1 white-text">
                {{q.answerFalse1}}
              </div>
            </div>

            <div class="answer">
              <div class="chip pink darken-1 white-text">
                {{q.answerFalse2}}
              </div>
            </div>

            <div class="answer">
              <div class="chip pink darken-1 white-text">
                {{q.answerFalse3}}
              </div>
            </div>
          </div>
          <div class="card-actions">
            <div class='right'>
              <a class="btn btn-floating purple darken-4 ">
                <i class="material-icons">edit</i>
              </a>
              &nbsp;
              <a class="btn btn-floating pink darken-1 " @click='removeQuestion(q.id)'>
                <i class="material-icons">delete</i>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
    <!-- Modal Structure -->
  <div id="modal" class="modal" ref='modal'>
    <div class="modal-content">
      <h4>Добавить вопрос</h4>
          <div class="input-field">
            <input type="text" id='name' v-model='questionName'>
            <label for="name">Название вопроса</label>
            <span v-if='v$.questionName.required.$invalid' class="helper-text invalid">Поле нельзя оставлять пустым</span>
        </div>
        <div class="input-field" @click='updateModal()'>
          <p>
            <label @click='updateModal()'>
              <input class="with-gap" name="group3" type="radio" checked value="open"  v-model='questionType' @click='updateModal()'/>
              <span @click='updateModal()'>Открытый</span>
            </label>
          </p>
          <p>
            <label @click='updateModal()'>
              <input class="with-gap" name="group3" type="radio"  value="close" v-model='questionType' @click='updateModal()' />
              <span @click='updateModal()'>Закрытый</span>
            </label>
          </p>
        </div>
        <div class="input-field">
          <textarea id='textarea' class='materialize-textarea' v-model='questionText'></textarea>
          <label for="textarea">Текст вопроса</label>
          <span v-if='v$.questionText.required.$invalid' class="helper-text invalid">Поле нельзя оставлять пустым</span>
        </div>
        <div v-if='this.questionType === "close"'>
          <div  class="input-field">
            <input type='text' id='closeTrue' v-model='closeAnswerTrue'>
            <label for="closeTrue">Правильный ответ</label>
            <span v-if='v$.closeAnswerTrue.required.$invalid' class="helper-text invalid">Поле нельзя оставлять пустым</span>
          </div>
          <div class="input-field">
            <input type='text' id='closeFalse1' v-model='closeAnswerFalse1'>
            <label for="closeFalse1">Неправильный ответ</label>
            <span v-if='v$.closeAnswerFalse1.required.$invalid' class="helper-text invalid">Поле нельзя оставлять пустым</span>
          </div>
          <div class="input-field">
            <input type='text' id='closeFalse2' v-model='closeAnswerFalse2'>
            <label for="closeFalse2">Неправильный ответ</label>
            <span v-if='v$.closeAnswerFalse2.required.$invalid' class="helper-text invalid">Поле нельзя оставлять пустым</span>
          </div>
          <div class="input-field">
            <input type='text' id='closeFalse3' v-model='closeAnswerFalse3'>
            <label for="closeFalse3">Неправильный ответ</label>
            <span v-if='v$.closeAnswerFalse3.required.$invalid' class="helper-text invalid">Поле нельзя оставлять пустым</span>
          </div>
        </div>
        <div class="input-field" v-if='this.questionType === "open"'>
          <input type='text' id='openText' v-model='openAnswer'>
          <label for="openText">Ответ</label>
          <span v-if='v$.openAnswer.required.$invalid' class="helper-text invalid">Поле нельзя оставлять пустым</span>
        </div>
     
    </div>
    
    <div class="modal-footer">
      <button class="waves-effect waves-green btn-flat" @click='AddQuestion'>
        <a href="#" >Добавить</a>
      </button>
      <button class='waves-effect waves-green btn-flat' @click='closeModal'>
        <a href="#" >Отменить</a>
      </button>
    </div>
  </div>
</template>

<script>
import useVuelidate  from '@vuelidate/core'
import {required, minLength} from '@vuelidate/validators'

export default {

  name: 'EditCategory',
  setup () {
    return { v$: useVuelidate() }
  },

  data () {
    return{
      questionName: '',
      questionType: 'open',
      questionText: '',
      openAnswer : '',
      closeAnswerTrue: '',
      closeAnswerFalse1: '',
      closeAnswerFalse2: '',
      closeAnswerFalse3: '',
      tooltip: null,
      modal: null,
      

     
    }
  },

  validations(){
    return{
      questionName : {required, $lazy: true},
      questionText: {required, $lazy: true},
      openAnswer: {required, $lazy: true},
      closeAnswerTrue: {required, $lazy: true},
      closeAnswerFalse1: {required, $lazy: true},
      closeAnswerFalse2: {required, $lazy: true},
      closeAnswerFalse3: {required, $lazy: true},
    }
  },

  mounted() {
    this.tooltip = M.Tooltip.init(this.$refs.tooltip)
    this.modal = M.Modal.init(this.$refs.modal)

    this.$store.commit('clearQuestions')
    this.$store.dispatch('fetchQuestions', {btzId: this.$route.query.btz_Id, categId: this.$route.query.categ_Id})
   
  },

  methods: {
    backClick(){
      this.$router.push({
        path: '/edit_btz',
        query: {
          btz_Id: this.$route.query.btz_id,
        }
      })
    },

    async AddQuestion(){
      if (this.questionType === 'open'){
        this.v$.$validate()
        if(this.v$.questionName.required.$invalid || this.v$.questionText.required.$invalid || this.v$.openAnswer.required.$invalid){
          console.log('wrong data (open answer)')
          return
        }
        
        await this.$store.dispatch('addOpenQuestion', {btzId : this.$route.query.btz_Id, categId: this.$route.query.categ_Id, name: this.questionName, type: this.questionType, text: this.questionText, answer: this.openAnswer})
        this.clearModal()
        this.modal.close()
      }

      if (this.questionType === 'close'){
        if (this.v$.questionName.required.$validate || this.v$.questionText.required.$invalid || this.v$.closeAnswerTrue.required.$invalid || this.v$.closeAnswerFalse1.required.$invalid || this.v$.closeAnswerFalse2.required.$invalid || this.v$.closeAnswerFalse2.required.$invalid){
          console.log('wrong data (close answer)')
        }
        await this.$store.dispatch('addCloseQuestion', {btzId: this.$route.query.btz_Id, categId: this.$route.query.categ_Id, name: this.questionName, type: this.questionType, text: this.questionText, answerTrue: this.closeAnswerTrue, answerFalse1: this.closeAnswerFalse1 , answerFalse2: this.closeAnswerFalse2 , answerFalse3: this.closeAnswerFalse3})
        this.clearModal()
        this.modal.close()
      }
    },

    removeQuestion(id){
      this.$store.dispatch('deleteQuestion',{btzId : this.$route.query.btz_Id, categId : this.$route.query.categ_Id, questionId: id})
      this.$store.commit('clearQuestions')
      this.$store.dispatch('fetchQuestions', {btzId: this.$route.query.btz_Id, categId: this.$route.query.categ_Id})
    },

    clearModal(){
      this.questionName = '',
      this.questionText = '',
      this.openAnswer = '',
      this.closeAnswerTrue = '',
      this.closeAnswerFalse1 = '',
      this.closeAnswerFalse2 = '',
      this.closeAnswerFalse3 = ''
    },

    closeModal(){
      this.modal.close()
    },

    
  }
}
</script>
