<template>
  <div class="page-title">
    <h3>Создать банк заданий</h3>
  </div>

  <div class="row">

    <div class="col s6 offset-s3">
      <form class='card auth card' @submit.prevent='submitHandler'>
        <div class="card-content">
          <div class="input-field">
            <input
            id='name'
            type='text'
            v-model='BtzData.name'
            >
            <label for="name">Название банка</label>
            <span v-if='v$.BtzData.name.required.$invalid' class="helper-text invalid">Введите название</span>
          </div>

          <div class="input-field">
            <input
            id='ze'
            type='number'
            v-model.number='BtzData.ze'
            
            
            >
            <label for="ze">Зачетные еденицы</label>
            <span v-if='v$.BtzData.ze.required.$invalid' class="helper-text invalid">Укажите кол-во зачетных едениц</span>
            <span v-if='v$.BtzData.ze.minValue.$invalid' class="helper-text invalid">Минимум 1</span>
            <span v-if='v$.BtzData.ze.maxValue.$invalid' class="helper-text invalid">Слишком много</span>
          </div>

           <!-- <div class="input-field">        
            <select  id='select' ref='select' multiple>
              <option v-for='p in programms' :key='p'> {{p}}</option>
            </select>
            <label for="select">Направление подготовки</label>
            
          </div> -->
        </div>

        <div class="card-action">
          <div>
            <button
              class="btn waves-effect waves-light auth-submit"
              type='submit'
            >
            Create
            </button>
          </div>
        </div>
      </form>
    </div>
  </div>

  
</template>

<script>
import useVuelidate  from '@vuelidate/core'
import {required, minValue, maxValue} from '@vuelidate/validators'

export default {

  name: 'CreateBtz',
  setup () {
    return { v$: useVuelidate() }
  },

  data () {
    return{
     
     BtzData:{
        name: '',
        ze: null,
        
        
      },
      select: null,
    }
    
  },

  validations() {
    return{
      BtzData: {
        name: {required, $lazy: true},
        ze: {required, minValue: minValue(1), maxValue: maxValue(99), $lazy: true}
      }
    }
  },



  mounted() {
    this.select = M.FormSelect.init(this.$refs.select);

     
  },

  methods: {
    async submitHandler(){
      this.v$.$validate()
      if (this.v$.$invalid){
        return
      }

      try{
        this.$store.dispatch('createBtz', { name : this.BtzData.name, ze : this.BtzData.ze})
        this.$router.push('btz_list')
      }
      catch(e) {}
    }
  }
}
</script>
