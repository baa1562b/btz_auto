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

           <div class="input-field">       
            <select  id='select' ref='select' multiple v-model='BtzData.selected'>
              <option v-for='p in programms' :key='p'> {{p}}</option>
            </select>
            <label for="select">Направление подготовки</label>
            <span v-if='v$.BtzData.ze.required.$invalid' class="helper-text invalid">Выберите направление(-я) подготовки</span>
          </div>
        </div>

        <div class="card-action">
          <div>
            <button
              class="btn waves-effect waves-light auth-submit"
              type='submit'
            >
            Создать БТЗ
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
        selected: '',
        
        
        
        
      },
      select: null,
      
      programms: [
        '04.03.01 Химия',
        '04.05.01 Фундаментальная и прикладная химия',
        '05.03.06 Экология и природопользование',
        '08.03.01 Строительство',
        '09.03.01 Информатика и вычислительная техника',
        '09.03.04 Программная инженерия',
        '13.03.02 Электротехника и электроэнергетика',
        '13.03.02 Электротехника и электроэнергетика',
        '20.03.01 Техносферная безопасность',
        '21.03.01 Нефтегазовое дело',
        '21.03.01 Нефтегазовое дело',
        '21.05.02 Прикладная геология',
        '23.03.03 Эксплуатация транспортно-технологических машин и комплексов',
        '38.03.01 Экономика',
        '38.03.02 Менеджмент',
        '38.05.01 Экономическая безопасность',
        '38.03.03 Управление персоналом',
        '39.03.02 Социальная работа',
        '40.03.01 Юриспруденция',
        '40.03.01 Юриспруденция',
        '42.03.02 Журналистика',
        '43.03.02 Туризм',
        '44.03.02 Психолого-педагогическое образование',
        '44.03.02 Психолого-педагогическое образование',
        '45.03.01 Филология',
        '45.03.02 Лингвистика',
        '49.03.01 Физическая культура',
      ],

      btz: []
    }
    
  },

  validations() {
    return{
      BtzData: {
        name: {required, $lazy: true},
        ze: {required, minValue: minValue(1), maxValue: maxValue(99), $lazy: true},
        selected: {required}
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
        this.$store.dispatch('createBtz', { name : this.BtzData.name, ze : this.BtzData.ze, facultet: this.BtzData.selected})
        this.$router.push('/btz_list')
        
      }
      catch(e) {}
    }
  }
}
</script>
