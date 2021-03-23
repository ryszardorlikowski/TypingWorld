<template>
  <div>
    Home page
    {{ isLoggedIn }}
  </div>
</template>

<script>
import {mapGetters} from "vuex";

export default {
  name: 'Home',
  computed: {
    ...mapGetters('auth', ['isLoggedIn', 'getUserData'])
  }
}
</script>
