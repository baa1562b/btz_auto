<template>
<div>
  <div class="page-title">
    <h3>Мои банки заданий</h3>
  </div>

  <div class="history-chart">
    <canvas></canvas>
  </div>
  
  <section>
    <table>
      <thead>
      <tr>
        <th>#</th>
        <th>Название</th>
        <th>Дата создания</th>
        <th>Направления подготовки</th>
        <th>Действия</th>
      </tr>
      </thead>

      <tbody>
      <tr v-for='b in btz' :key=b>
        <td>id</td>
        <td>{{b.name}}</td>
        <td>12.12.32</td>
        <td>09.03.04 "PI"</td>

        <td>
          <button class="btn-small btn orange lighten-1">
            <i class="material-icons">info</i>
          </button>

        </td>
      </tr>
      </tbody>
    </table>
  </section>
</div>
</template>

<script>
import { computed } from '@vue/runtime-core'
export default {
  data(){
    return{
      btz: this.$store.state.btz
    }
  },

  async mounted(){
    await this.$store.dispatch('fetchBtz')
  },


}
</script>
