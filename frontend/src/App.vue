<template>
  <div>
    <NavBar/>
    <div class="container">
      <router-view/>
    </div>
    <Footer />
  </div>
</template>
<script>
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";

export default {
  name: 'App',
  components: {NavBar, Footer},
}
</script>
<style>
* {
  margin: 0;
}
</style>
