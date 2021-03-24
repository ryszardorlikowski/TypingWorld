<template>
<div>
  Lesson view {{lessonId}}
</div>
</template>

<script>
export default {
name: 'Lesson',
  data(){
  return{
    lessonId: null,
  }
  },
  created() {
  this.lessonId = this.$route.params.lessonId;
  },
}
</script>

<style scoped>

</style>