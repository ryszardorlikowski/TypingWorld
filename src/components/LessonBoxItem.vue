<template>
  <div class="lesson-box" :class="{ready: lesson.exercise}">
    <div class="title">
      {{ lesson.name }}
    </div>
    <div class="result" v-if="lesson.exercise">
      <span>Speed: <b>{{ lesson.exercise.average_speed }}</b> wpm</span>
      <span>Points: <b>{{ lesson.exercise.points }}</b></span>
    </div>
    <div v-else>
      click to start
    </div>
  </div>
</template>

<script>
export default {
  name: 'LessonBoxItem',
  props: {
    lesson: {
      type: Object,
      required: true,
    },
  }
}
</script>

<style scoped>
.lesson-box {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border: 2px solid #000000;
  border-radius: 10px;
  width: 25%;
  margin: 10px;
  padding: 15px;
  text-align: center;
  cursor: pointer;
}

.lesson-box:hover {
  background: #e3e3e3;
}

.ready {
  border-color: #6f0606;
  background: #ffffa5;
}

.lesson-box .title {
  font-size: 1.2em;
  font-weight: 600;
  margin-bottom: 25px;

}

.lesson-box .info-box {
  margin-top: 20px;
  font-size: 0.8em;
}

.lesson-box .result {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.lesson-box .result span {
  margin: 5px 0;
}

.lesson-box .result span b {
  color: #6f0606;
}
</style>