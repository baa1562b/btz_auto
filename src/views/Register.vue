<template>
<form class="card auth-card" @submit.prevent='submitHandler'>
  <div class="card-content">
    <span class="card-title">Домашняя бухгалтерия</span>
    <div class="input-field">
      <input
          id="email"
          type="text"
          v-model='state.email'
          :class="{invalid: v$.state.email.$invalid}"
      >
      <label for="email">Email</label>
      <small v-if='v$.state.email.email.$invalid' class="helper-text invalid">Введите корректный адрес</small>
      <small v-else-if='v$.state.email.required.$invalid' class="helper-text invalid">Поле не должно быть пустым</small>
    </div>
    <div class="input-field">
      <input
          id="password"
          type="password"
          class="validate"
          v-model='state.password.password'
          :class="{invalid: v$.state.password.password.required.$invalid}"
      >
      <label for="password">Пароль</label>
      <small v-if='v$.state.password.password.required.$invalid' class="helper-text invalid">Придумайте пароль</small>
      <small v-else-if='v$.state.password.password.minLength.$invalid' class="helper-text invalid">минимум 6 символов</small>
    </div>
    <div class="input-field">
      <input
          id="confirm"
          type="password"
          class="validate"
          v-model='state.password.confirm'
          :class="{invalid: v$.state.password.confirm.$invalid}"
          
      >
      <label for="confirm">Подтвердите пароль</label>
      <small v-if='v$.state.password.confirm.required.$invalid' class="helper-text invalid">Повторите пароль</small>
      <small v-else-if='v$.state.password.confirm.sameAs.$invalid' class="helper-text invalid">Пароли не совпадают</small>
      <small v-else-if='v$.state.password.confirm.minLength.$invalid' class="helper-text invalid">минимум 6 символов</small>
    </div>
    <div class="input-field">
      <input
          id="name"
          type="text"
          class="validate"
          v-model='state.login'
          :class="{invalid: v$.state.login.$invalid}"
      >
      <label for="name">Логин</label>
      <small v-if='v$.state.login.required.$invalid' class="helper-text invalid">Придумайте логин</small>
      <small v-else-if='v$.state.login.minLength.$invalid' class="helper-text invalid">Минимум {{v$.state.login.minLength.$params.min}} символов (сейчас {{this.state.login.length}})</small>
      
    </div>
    <p>
      <label>
        <input 
        type="checkbox" 
        v-model='state.agree'
        >
        <span :class="{'helper-text invalid' : v$.state.agree.checked.$invalid}">С правилами согласен</span>
      </label>
    </p>
    <small v-if='v$.state.agree.checked.$invalid' class="helper-text invalid">Необходимо согласиться с правилами</small>
  </div>
  <div class="card-action">
    <div>
      <button
          class="btn waves-effect waves-light auth-submit"
          type="submit"
      >
        Зарегистрироваться
        <i class="material-icons right">send</i>
      </button>
    </div>

    <p class="center">
      Уже есть аккаунт?
      <router-link to='/login'>Войти!</router-link>
    </p>
  </div>
</form>
</template>

<script>
import useVuelidate  from '@vuelidate/core'
import {email, required, minLength, sameAs} from '@vuelidate/validators'

export default {
  name: 'register',
  setup () {
    return { v$: useVuelidate() }
  },

  data() {
    return{
      state:{
        email: '',
        agree: false,
        password: {
          password: '',
          confirm: '',
        },
        login: ''
     }
    }
    
  },

  validations () {
    return{
      state: {
      email: {required, email, $lazy: true},
      agree: {checked: v => v, $lazy: true},
      password: {
        password: {required, minLength: minLength(6), $lazy: true},
        confirm: {required, minLength: minLength(6), sameAs: sameAs(this.state.password.password), $lazy: true},
      },
      login: {required, minLength: minLength(6), $lazy: true}
    }
    }
    
    
  },

  methods: {
    async submitHandler(){
      this.v$.$validate()
      if (this.v$.$invalid){
      return
    }

      const formData ={
        email: this.state.email,
        password: this.state.password.password,
        login: this.state.login

      }
      
      try {
        await this.$store.dispatch('register', formData)
       this.$router.push('/')
      }
      catch (e)
      {
        
      }
    }
  }

}
</script>
