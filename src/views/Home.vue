<template>
  <div class="home">
    Home page
    {{ isLoggedIn }}
  </div>
</template>

<script>
import {mapGetters} from "vuex";

export default {
  name: 'Home',
  components: {},
  computed: {
    ...mapGetters('auth', ['isLoggedIn', 'getUserData'])
  }
}
</script>
