<template>
  <div>
    <ul class="collection with-header">
        <li class="collection-header">
          <div class="row">
            <div class="col s10 ">
              <h5>Друг пяточка- это? </h5>(открытый вопрос)
            </div>
            
            <div class="col s2">
              <button class="btn-small btn green lighten-1">
                <i class="material-icons">edit</i>
              </button>
              &nbsp;
              <button class="btn-small btn red lighten-1">
                <i class="material-icons">delete</i>
              </button>
            </div>
          </div>
        </li>
        <li class="collection-item"><div>Ответ: Винни-пух</div></li>
    </ul>
    <ul class="collection with-header">
        <li class="collection-header">
          <div class="row">
            <div class="col s10">
              <h5>Имя главной злодейки мультфильма 101 долматинец?</h5>
              (закрытый вопрос)
            </div>
            <div class="col s2 ">
              <button class="btn-small btn green lighten-1">
                <i class="material-icons">edit</i>
              </button>
               &nbsp;
              <button class="btn-small btn red lighten-1">
                <i class="material-icons">delete</i>
              </button>
            </div>
            
          </div>
        </li>
        <li class="collection-item"><div>Правильный ответ: Круэелла девиль</div></li>
        <li class="collection-item"><div>Неправильный ответ: Гермиона Грейнджер</div></li>
        <li class="collection-item"><div>Неправильный ответ: Мальвина</div></li>
        <li class="collection-item"><div>Неправильный ответ: Анна Каренина</div></li>
        
    </ul>
  </div>
  <div class="fixed-action-btn">
    <a  class=" btn btn-floating btn-large orange tooltipped modal-trigger" href='#modal' ref ='tooltip' data-position="left" data-tooltip='Добавить вопрос'>
      <i class="large material-icons">add</i>
    </a>
  </div>

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
  },

  methods: {
    async AddQuestion(){
      if (this.questionType === 'open'){
        this.v$.$validate()
        if(this.v$.questionName.required.$invalid || this.v$.questionText.required.$invalid || this.v$.openAnswer.required.$invalid){
          console.log('wrong data (open answer)')
          return
        }
        let question = {
          name : this.questionName,
          type : this.questionType,
          text: this.questionText,
          answer: this.openAnswer
        }
        await this.$store.dispatch('addOpenQuestion', {btzId : this.$route.query.btz_Id, categId: this.$route.query.categ_Id, name: this.questionName, type: this.questionType, text: this.questionText, answer: this.openAnswer})
        console.log('open question added')
        this.modal.close()
      }

      if (this.questionType === 'close'){
        if (this.v$.questionName.required.$validate || this.v$.questionText.required.$invalid || this.v$.closeAnswerTrue.required.$invalid || this.v$.closeAnswerFalse1.required.$invalid || this.v$.closeAnswerFalse2.required.$invalid || this.v$.closeAnswerFalse2.required.$invalid){
          console.log('wrong data (close answer)')
        }
        console.log('close')
        this.modal.close()
      }
    },

    closeModal(){
      this.modal.close()
    },

    updateModal(){
      M.updateTextFields()
    }
  }
}
</script>

