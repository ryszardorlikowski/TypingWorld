<template>
  <footer>
    @{{ currentYear }} All right reserved
  </footer>
</template>

<script>
export default {
  name: "Footer",
  computed: {
    currentYear() {
      const date = new Date();
      return date.getFullYear();
    }
  }
}
</script>

<style scoped>
footer {
  background-color: #000;
  padding: 10px 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #e3e3e3;
}
</style>