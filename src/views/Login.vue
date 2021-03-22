<template>
  <div class="form-box">
    <div class="form-box__title">Login to your account</div>
    <form class="form" action="#" @submit.prevent="login">
      <label>
        Username:
        <input class="form__input" type="text" v-model="username">
      </label>
      <label>
        Password:
        <input class="form__input" type="password" v-model="password">
      </label>
      <button class="button">Login</button>
      <div v-for="msg in errors" :key="msg" class="form__text-error">{{ msg }}</div>
    </form>
    <div class="form-box__footer">
      Don't have an account?
      <router-link :to="{name: 'Register'}">Register now</router-link>
    </div>
  </div>
</template>

<script>
import authActionsType from '@/store/auth/actions.type'

export default {
  name: 'Login',
  components: {},
  data() {
    return {
      username: '',
      password: '',
      errors: []
    }
  },
  methods: {
    login() {
      if (this.validForm()) {
        this.$store.dispatch(`auth/${authActionsType.LOGIN}`, {
          username: this.username,
          password: this.password
        }).then(() => {
          this.$router.push({name: 'Home'});
        }).catch(error => {
          if (error.response?.status === 401) {
            this.errors.push("Your username or password is incorrect.");
          } else {
            this.errors.push("Failed login, try again later.");
          }
        })
      }
    },
    validForm() {
      this.errors = []
      if (!this.username) {
        this.errors.push("Please enter username.");
      }
      if (!this.password) {
        this.errors.push("Please enter password.");
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