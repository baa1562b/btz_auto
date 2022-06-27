<template>
  <form class="card auth-card" @submit.prevent='submitHandler'>
    <div class="card-content">
      <span class="card-title font">AutoTest</span>
      <div class="input-field">
        <input
            id="email"
            type="text"
            v-model='email'
            :class="{invalid : v$.email.required.$invalid || v$.email.email.$invalid }"
        >
        <label  for="email">Email</label>
        <small v-if='v$.email.required.$invalid' class="helper-text invalid">поле не должно быть пустым</small>
        <small v-else-if='v$.email.email.$invalid' class="helper-text invalid">введите корректный email адрес</small>
      </div>
      <div class="input-field">
        <input
            id="password"
            type="password"
            v-model='password'
            :class="{invalid : v$.password.required.$invalid}"
        >
        <label for="password">Пароль</label>
        <small v-if='v$.password.required.$invalid' class="helper-text invalid">Пожалуйста, введите пароль</small>
        <small v-if='v$.password.minLength.$invalid' class="helper-text invalid">минимум {{v$.password.minLength.$params.min}} символов</small>
      </div>
    </div>
    <div class="card-action">
      <div>
        <button
            class="btn waves-effect waves-light auth-submit purple darken-4"
            type="submit"
        >
          Войти
          <i class="material-icons right">send</i>
        </button>
      </div>

      <p class="center">
        Нет аккаунта?
        <router-link to='/register'>Зарегистрироваться</router-link>
      </p>
    </div>
  </form> 
</template>

<style scoped>
 .font{
  font-family: Impact, Haettenschweiler, 'Arial Narrow Bold', sans-serif;
  font-size: 20px
 }
</style>

<script>
import useVuelidate  from '@vuelidate/core'
import {email, required, minLength} from '@vuelidate/validators'
import messages from '@/utils/messages'


export default {


  name: 'login',

  mounted() {
  if (this.$route.query.message) {
    this.$message(messages[this.$route.query.message])
  }
  

  },
  
  setup () {
    return { v$: useVuelidate() }
  },

  data: () => ({
      email: '',
      password: '',
  }),

  validations: () => ({
    email: {email, required, $lazy: true},
    password: {required, minLength: minLength(6), $lazy: true}
  }),


  methods: {
    async submitHandler() {
    this.v$.$validate()
    if (this.v$.$invalid){
      this.$error(messages['invalid'])
      return
    }

    const formData = {
      email: this.email,
      password: this.password
    }
    
    try {
      await this.$store.dispatch('login', formData)
       this.$router.push('/')
    }

    catch (e) {

    }
    

    }
  }
}
</script>
