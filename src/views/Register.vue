<template>
  <div class="form-box">
    <div class="form-box__title">Register a new account</div>
    <form class="form" action="#" @submit.prevent="register">
      <label>
        Username:
        <input class="form__input" type="text" v-model="username">
      </label>
      <label>
        Email:
        <input class="form__input" type="text" v-model="email">
      </label>
      <label>
        Password:
        <input class="form__input" type="password" v-model="password">
      </label>
      <label>
        Repeat password:
        <input class="form__input" type="password" v-model="repeatPassword">
      </label>
      <button class="button">Register</button>
      <div v-for="msg in errors" :key="msg" class="form__text-error">{{ msg }}</div>
    </form>
    <div class="form-box__footer">
      Do you have an account?
      <router-link :to="{name: 'Login'}">Login</router-link>
    </div>
  </div>
</template>

<script>
import apiClient from '@/services/api'

export default {
  name: "Register",
  data() {
    return {
      username: '',
      email: '',
      password: '',
      repeatPassword: '',
      errors: []
    }
  },
  methods: {
    register() {
      if (!this.formIsValid()) {
        return
      }
      apiClient.register(this.username, this.email, this.password)
          .then(() => {
            this.$router.push({name: 'Login'})
          })
          .catch(error => {
            if (error.response?.status === 400) {
              const errorMessages = error.response.data;
              Object.keys(errorMessages).forEach(errorKey => {
                let errorMsg = errorMessages[errorKey][0]
                errorMsg = `${errorMsg[0].toUpperCase()}${errorMsg.slice(1)}`
                this.errors.push(errorMsg);
              })
            } else {
              this.errors.push("Failed, try again later.");
            }
          })
    },
    formIsValid() {
      const emailReg = /\S+@\S+\.\S+/;
      this.errors = []
      if (!this.username || this.username.indexOf(' ') !== -1) {
        this.errors.push("Please enter valid username.");
      }
      if (!this.email || !emailReg.test(this.email)) {
        this.errors.push("Please enter valid email.");
      }
      if (!this.password) {
        this.errors.push("Please enter password.");
      }
      if (!this.repeatPassword) {
        this.errors.push("Please enter repeat password.");
      }
      if (this.password !== this.repeatPassword) {
        this.errors.push("Passwords don't match.")
      }
      if (!this.errors.length) {
        return true;
      }
    }


  }
}
</script>

<style scoped>

</style>