<template>
  <nav>
    <div class="brand">
      <router-link :to="{name: 'Home'}">TypingWorld</router-link>
    </div>
    <ul class="menu">
      <li>
        <router-link :to="{name: 'Home'}">Home</router-link>
      </li>
      <li v-if="!isLoggedIn">
        <router-link :to="{name: 'Login'}">Login</router-link>
      </li>
      <li v-if="!isLoggedIn">
        <router-link :to="{name: 'Register'}">Register</router-link>
      </li>
      <li v-if="isLoggedIn">
        <router-link :to="{name: 'Dashboard'}">Dashboard</router-link>
      </li>
      <li v-if="isLoggedIn">
        <a @click="logout" href="#">Logout</a>
      </li>
      <li v-if="isLoggedIn">
        <span>Hi {{ getUserData.username }}!</span>
      </li>
    </ul>
  </nav>
</template>

<script>
import {mapGetters} from "vuex";
import authActionsType from "@/store/auth/actions.type";

export default {
  name: "NavBar",
  methods: {
    logout() {
      this.$store.dispatch(`auth/${authActionsType.LOGOUT}`).then(() => {
        this.$router.push({name: 'Home'});
      })
    }
  },
  computed: {
    ...mapGetters('auth', ['isLoggedIn', 'getUserData'])
  }

}
</script>

<style scoped>
nav {
  background-color: #000;
  padding: 10px 30px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #e3e3e3;
}

.brand a {
  color: #e3e3e3;
  font-weight: 600;
  font-size: 25px;
}

.menu {
  display: flex;
  justify-content: space-between;
  list-style: none;
}

.menu li {
  margin: 0 15px;
}

.menu li a {
  color: #e3e3e3;
}

.menu li a:hover {
  font-style: italic;
}
.menu li span {
  font-weight: 600;
}
</style>