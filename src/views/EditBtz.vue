<template>
  <div class="page-title">
    <h5>Список категорий  "{{btz.name}}"" (Дата создания банка: {{btz.dateCreated}})</h5>
  </div>
  <!-- <div class="row">
    <div class="col s10 offset-s1">
      <div class="card">
        <div class="card-content" >
          <ul class="collapsible" ref='collapsible'>
            <li>
              <div class="collapsible-header"><i class="material-icons">filter_drama</i>First</div>
              <div class="collapsible-body"><span>Lorem ipsum dolor sit amet.</span></div>
            </li>
            
            <li>
              <div class="collapsible-header"><i class="material-icons">place</i>Second</div>
              <div class="collapsible-body"><span>Lorem ipsum dolor sit amet.</span></div>
            </li>
            <li>
              <div class="collapsible-header"><i class="material-icons">whatshot</i>Third</div>
              <div class="collapsible-body"><span>Lorem ipsum dolor sit amet.</span></div>
            </li>
            
          </ul>
        </div>
      </div>
    </div>
  </div> -->
  <div class="fixed-action-btn">
    <a  class=" btn btn-floating btn-large orange tooltipped modal-trigger" href='#modal' ref ='tooltip' data-position="left" data-tooltip='Создать новую категорию'>
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
            <button class="btn-small btn orange lighten-1" @click='editCatogory (c.id)'>
              <i class="material-icons">info</i>
            </button>

            &nbsp;

            <button class="btn-small btn red lighten-1" @click='deleteCategory (c.id, c)'>
              <i class="material-icons">delete</i>
            </button>
          </td>
          
        
        </tr>
      </tbody>
    </table>
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


export default {
 

  name: 'EditBtz',
  setup () {
    return { v$: useVuelidate() }
  },

  data() {
    return{
      categoryName: '',
      btz: [],
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
      // console.log(id + 'this is id')
      // console.log(index + 'this is index')
      
    },

    editCatogory(id){
      
      // this.$router.push('/edit_category?id=' + id)
      this.$router.push({
        path: '/edit_category',
        query: {
          btz_Id: this.$route.query.btz_id,
          categ_Id: id
        }
      })
    }
  }

}
</script>
