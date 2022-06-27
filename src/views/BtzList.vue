<template>
<div>
  <div class="page-title">
    <h3>Мои банки заданий</h3>
  </div>

 
 
  <section>
    <table>
      <thead>
      <tr>
        <th>#</th>
        <th>Название</th>
        <th>Дата создания</th>
        <th>Зачетные еденицы</th>
        <th>Направления подготовки</th>
        <th>Действия</th>
      </tr>
      </thead>

      <tbody>
      <tr v-for='(b, i) in this.$store.state.btz.btz' :key='b.id'>
        <td>{{i+1}}</td>
        <td>{{b.name}}</td>
        <td>{{b.dateCreated}}</td>
        <td>{{b.ze}}</td>
        <td>
          <div class="chip" v-for='(f, i) in b.facultet' :key='i'>
               {{f}} 
          </div>
        </td>
        

        <td>
          <button class="btn-small btn purple darken-4 lighten-1" @click='editBtz(b.id)'>
            <i class="material-icons">info</i>
          </button>
          &nbsp;
          
          <button class="btn-small btn pink darken-1 lighten-1" @click='deleteBtz(b.id)'>
            <i class="material-icons">delete</i>
          </button>

        </td>
      </tr>
      </tbody>
      
    </table>
    <div class="row" v-if='JSON.stringify(this.$store.state.btz.btz) === "{}"'>
      <div class="col s8 offset-s3"><h5>У  ВАС ПОКА НЕТ БАНКОВ ТЕСТОВЫХ ЗАДАНИЙ</h5></div>
    </div>
  </section>
</div>
</template>

<script>


export default {
   data(){
    return{
      btz: []
    }
  },

   mounted(){
    this.$store.dispatch('fetchBtz')
    this.btz = this.$store.state.btz.btz
  },
  

  methods:{
    editBtz(id) {
      
      
      
      this.$router.push({
        path: '/edit_btz',
        query: {btz_id : id}
      })
      
    },

    async deleteBtz(id){
      await this.$store.dispatch('deleteBtz', id)
      await this.$store.commit('clearBtz')
      await this.$store.dispatch('fetchBtz')
      this.btz =  await this.$store.state.btz.btz
    }
  }

}
</script>
