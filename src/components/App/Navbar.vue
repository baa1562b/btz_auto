<template>
      <nav class="navbar purple darken-4">
      <div class="nav-wrapper">
        <div class="navbar-left">
          <a href="/">
            <span class="white-text font">AutoTest</span>
          </a>
          <span class="white-text">{{date}}</span>
        </div>

        <ul class="right hide-on-small-and-down">
          <li>
            <a
                class="dropdown-trigger white-text"
                href="#"
                data-target="dropdown"
                ref='dropdown'
            >
              {{name}}
              <i class="material-icons right">arrow_drop_down</i>
            </a>

            <ul id='dropdown' class='dropdown-content'>
              <li>
                <router-link to='/bug_report' class='black-text'>
                  <i class="material-icons">error</i>Сообщить об ошибке
                </router-link>
              </li>
              <li class="divider" tabindex="-1"></li>
              <li>
                <a href="#" class="black-text" @click.prevent="logout">
                  <i class="material-icons">assignment_return</i>Выйти
                </a>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </nav>
</template>

<style scoped>
 .font{
  font-family: Impact, Haettenschweiler, 'Arial Narrow Bold', sans-serif;
  font-size: 20px
 }
</style>


<script>
export default {
  data: () => ({
    date: new Date(),
    intervall: null,
    dropdown: null,
    
  }),
  methods: {
    async logout(){
       await this.$store.dispatch('logout')
      this.$router.push('/login?message=logout')
    },
  },

  computed: {
    name () {
      return this.$store.getters.info.login
    }
  },

  mounted(){
    this.intervall = setInterval(() => {
      this.date = new Date().toLocaleString('ru-Ru')
    } ),
    
    this.dropdown = M.Dropdown.init(this.$refs.dropdown,{constrainWidth: false})
  },

  beforeUnmount(){
    clearInterval(this.intreval)
    if (this.dropdown && this.dropdown.destroy) {
      this.dropdown.destroy() 
    }
  }
}
</script>
