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
      <tr v-for='(b, i) in btz.btz' :key='b.id'>
        <td>{{i+1}}</td>
        <td>{{b.name}}</td>
        <td>{{b.dateCreated}}</td>
        <td>{{b.ze}}</td>
        <td>09.03.04 "PI"</td>
        

        <td>
          <button class="btn-small btn orange lighten-1" @click='editBtz(b.id)'>
            <i class="material-icons">info</i>
          </button>
          &nbsp;
          
          <button class="btn-small btn red lighten-1" @click='deleteBtz(b.id)'>
            <i class="material-icons">delete</i>
          </button>

        </td>
      </tr>
      </tbody>
    </table>
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

  async mounted(){
    
   this.btz =  await this.$store.state.btz
  },

  methods:{
    editBtz(id) {
      console.log(id)
      this.$router.push('/edit_btz?id=' + id)
      
    },

    async deleteBtz(id){
      await this.$store.dispatch('deleteBtz', id)
      await this.$store.commit('clearBtz')
      await this.$store.dispatch('fetchBtz')
      this.btz =  await this.$store.state.btz
    }
  }

}
</script>
