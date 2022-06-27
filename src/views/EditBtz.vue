<template>
<div class="page-title">
  <a class="btn btn-floating purple darken-4" @click='this.$router.go(-1)'>
    <i class="material-icons">arrow_back</i>
  </a>
</div>
  <div class="page-title">
    <h5>Список категорий  "{{btz.name}}"" (Дата создания банка: {{btz.dateCreated}})</h5>
    <a  v-if='JSON.stringify(this.$store.state.btz.categories) != "{}"' class=" btn btn-floating  green darken-4" @click="saveDataToFile">
      <i class="large material-icons">save</i>
    </a>
  </div>
  <h6 v-if='JSON.stringify(this.$store.state.btz.categories) != "{}"'>Банк готов на {{parseFloat(percent.slice(0, -1)).toFixed(2)}}%</h6>
  <div class="progress" v-if='JSON.stringify(this.$store.state.btz.categories) != "{}"'>
      <div class="determinate" :style="{width:percent}"></div>
  </div>
  

  <div class="fixed-action-btn">
    <a  class=" btn btn-floating btn-large purple darken-4 tooltipped modal-trigger" href='#modal' ref ='tooltip' data-position="left" data-tooltip='Создать новую категорию'>
      <i class="large material-icons">add</i>
    </a>
  </div>
  

  <section>
    <table>
      <tbody>
        <tr v-for='c in this.$store.state.btz.categories' :key='c.id'>
          <td>{{c.categoryName}}</td>
          <td>&nbsp;&nbsp;&nbsp;</td>
          <td>&nbsp;&nbsp;&nbsp;</td>
          <td>&nbsp;&nbsp;&nbsp;</td>
          <td>&nbsp;&nbsp;&nbsp;</td>
          <td>&nbsp;&nbsp;&nbsp;</td>
          <td>&nbsp;&nbsp;&nbsp;</td>
          <td>&nbsp;&nbsp;&nbsp;</td>
          <td>&nbsp;&nbsp;&nbsp;</td>
          <td>&nbsp;&nbsp;&nbsp;</td>
          <td>&nbsp;&nbsp;&nbsp;</td>
          <td>&nbsp;&nbsp;&nbsp;</td>
          <td>&nbsp;&nbsp;&nbsp;</td>
          <td>&nbsp;&nbsp;&nbsp;</td>
          <td>&nbsp;&nbsp;&nbsp;</td>
          <td>&nbsp;&nbsp;&nbsp;</td>
          <td>&nbsp;&nbsp;&nbsp;</td>
          <td>&nbsp;&nbsp;&nbsp;</td>
          <td>
            <button class="btn-small btn purple darken-4 lighten-1" @click='editCatogory (c.id)'>
              <i class="material-icons">info</i>
            </button>

            &nbsp;

            <button class="btn-small btn pink darken-1 lighten-1" @click='deleteCategory (c.id, c)'>
              <i class="material-icons">delete</i>
            </button>
          </td>
          
        
        </tr>
      </tbody>
    </table>
    <div class="row" v-if='JSON.stringify(this.$store.state.btz.categories) === "{}"'>
      <div class="col s8 offset-s3"><h5>В ЭТОМ БАНКЕ ПОКА НЕТ КАТЕГОРИЙ</h5></div>
    </div>
  </section>

    <!-- Modal Structure -->
  <div id="modal" class="modal" ref='modal'>
    <div class="modal-content">
      <h4>Добавить категорию</h4>
        <div class="input-field">
          <input
            id='name'
            type='text'
            v-model='categoryName'
            >
          <label for="name">Название категории</label>
          <span v-if='v$.categoryName.required.$invalid' class="helper-text invalid">Поле нельзя оставлять пустым</span>
          <span v-if='v$.categoryName.minLength.$invalid' class="helper-text invalid">Минимум 6 символов</span>
        </div>
    </div>
    <div class="modal-footer">
      <a href="#" class="waves-effect waves-green btn-flat" @click="addCategory">Добавить</a>
      <a href="#" class="modal-close waves-effect waves-green btn-flat">Отменить</a>
    </div>
  </div>

</template>

<script>
import useVuelidate  from '@vuelidate/core'
import {required, minLength} from '@vuelidate/validators'
import {saveAs} from '@/utils/FileSaver'


export default {
 

  name: 'EditBtz',
  setup () {
    return { v$: useVuelidate() }
  },

  data() {
    return{
      categoryName: '',
      btz: [],
      percent: '30%',
      categories: [],
      abc: {},
      collapsible: null,
      modal: null,
      tooltip: null,
      modalInstance: null
      

    }
  },

  validations() {
    return{
      categoryName : {required, minLength: minLength(6), $lazy: true}
    }
  },

  async mounted(){
  
    this.$store.commit('clearCategories')
    this.$store.dispatch('fetchCategories', {btzId : this.$route.query.btz_id})
    this.$store.dispatch('fetchBtz')
    this.btz =  this.$store.getters.btz.find(b => b.id === this.$route.query.btz_id)

    this.collapsible = M.Collapsible.init(this.$refs.collapsible)
    this.tooltip = M.Tooltip.init(this.$refs.tooltip)
    this.modal = M.Modal.init(this.$refs.modal)
    this.modalInstance = M.Modal.getInstance(this.$refs.modal)
    this.readyPercent()
    
  },

  computed: {
 
  },

  beforeUnmount(){
    if (this.collapsible && this.collapsible.destroy) {
        this.collapsible.destroy() 
    }

    if (this.tooltip && this.tooltip.destroy) {
        this.tooltip.destroy() 
    }

    if (this.modal && this.modal.destroy){
      this.modal.destroy()
    }
  },

  

  methods: {
   async addCategory(){
      this.v$.$validate()
      if (this.v$.$invalid){
        return
      }
      await this.$store.dispatch('addCategory', {btzId : this.$route.query.btz_id, categoryName: this.categoryName})
      
      
      this.modal.close()
    },

    async deleteCategory(id){
      await this.$store.dispatch('deleteCategory', {btzId : this.$route.query.btz_id , categId: id })
      this.$store.commit('clearCategories')
      this.$store.dispatch('fetchCategories', {btzId : this.$route.query.btz_id}) 
    },

    editCatogory(id){
      
      
      this.$router.push({
        path: '/edit_category',
        query: {
          btz_Id: this.$route.query.btz_id,
          categ_Id: id
        }
      })
    },

    readyPercent(){
      let count = 0
      
      var categ = JSON.parse(JSON.stringify(this.$store.state.btz.categories))
      for (var i in categ){
        let newCateg = categ[i]
        for (var q in newCateg.questions) {
          count++
        }
      }
      if (this.btz.ze * 50 >= 250) {
        let ze = 250
        if (this.count !== 0 ){
          this.percent = count/ze*100 + '%'
          }
        else if(count == 0) {
          this.percent = '0%'
        }
        
      }

      if (this.btz.ze* 50 < 250){
        let ze = this.btz.ze * 50
        if (this.count !== 0 ){
          this.percent = count/ze*100 + '%'
          }
        else if(count == 0) {
          this.percent = '0%'
        }
        
      }
    },

    saveDataToFile(){
      

     

      var categ = JSON.parse(JSON.stringify(this.$store.state.btz.categories))
      var forBlob = ''
      for (var i in categ) {
        var getName = categ[i]
        var theme = "\n$CATEGORY: КАТЕГОРИЯ ПО УМОЛЧАНЮ/Шаблон/" + getName.categoryName
        forBlob = forBlob + "\n" + theme
        for (var k in getName.questions){
          var getQ = getName.questions[k]
          if (getQ.type === "open"){
            var questionOpen = "\n" + getQ.text + "{" + "\n" + "=" + getQ.answer + "\n" + "}"
            forBlob = forBlob + '\n' + questionOpen
          }
          if (getQ.type === 'close'){
            var questionClose = "\n" + getQ.text + "{" + "\n" + "=" + getQ.answerTrue + "\n" + "~" + getQ.answerFalse1 + "\n" + "~" + getQ.answerFalse2 + "\n" + "~" + getQ.answerFalse3 + "\n" + "}"
            forBlob = forBlob + '\n' + questionClose
          }
          
        }
      }

      var blob = new Blob([forBlob],
                { type: "text/plain;charset=utf-8" });
            saveAs(blob, this.btz.name + ".txt");
    }
  }
}
</script>
