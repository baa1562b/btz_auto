<template>
  <div class="page-title">
    <h3>{{btz.name}} (создан: {{btz.dateCreated}})</h3>
  </div>
  <div class="row">
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
  </div>
  <div class="fixed-action-btn">
    <a  class="btn-floating btn-large orange tooltipped" ref ='tooltip' data-position="bottom" data-tooltip='Создать новую категорию' href="#">
      <i class="large material-icons">add</i>
    </a>
  </div>
</template>

<script>
export default {

  data() {
    return{
      btz: []
    }
  },

   mounted(){
      
      
      this.btz = this.$store.state.btz
      this.btz = this.btz.btz.find(b => b.id === this.$route.query.id)
      this.collapsible = M.Collapsible.init(this.$refs.collapsible)
      this.tooltip = M.Tooltip.init(this.$refs.tooltip)
    },

  beforeUnmount(){
    if (this.collapsible && this.collapsible.destroy) {
        this.collapsible.destroy() 
    }
  }

}
</script>
