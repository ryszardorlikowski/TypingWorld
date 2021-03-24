<template>
  <div>
    <LoadingBoard v-if="isLoading"/>
    <ErrorBoard v-else-if="isError"/>
    <div class="lessons-list" v-else>
      <LessonBoxItem v-for="lesson in finalLessonsList" :lesson="lesson" :key="lesson.id"
                     @click="goToLesson(lesson.id)"/>
    </div>
  </div>
</template>

<script>

import apiClient from '@/services/api'
import LessonBoxItem from "@/components/LessonBoxItem";
import ErrorBoard from "@/components/ErrorBoard";
import LoadingBoard from "@/components/LoadingBoard";

export default {
  name: 'Dashboard',
  components: {
    LessonBoxItem,
    LoadingBoard,
    ErrorBoard,
  },
  data() {
    return {
      loadDataError: false,
      lessonsList: [],
      userExercisesList: [],
      isLoading: false,
      isError: false
    }
  },
  computed: {
    finalLessonsList() {
      return this.lessonsList.map(item => {
        const exercise = this.userExercisesList.find(x => x.lesson === item.id)
        if (exercise) {
          item.exercise = exercise;
        } else {
          item.exercise = null;
        }
        return item
      })
    }
  },
  methods: {
    goToLesson(lessonId) {
      this.$router.push({name: 'Lesson', params: {lessonId: lessonId}})
    }
  },
  created() {
    this.isLoading = true;
    apiClient.getAllLessons()
        .then(({data}) => {
          this.lessonsList = data;
          this.isLoading = false;
        })
        .catch(() => {
          this.isLoading = false;
          this.isError = true;
        })
    apiClient.getAllUserExercises()
        .then(({data}) => {
          this.userExercisesList = data;
          this.isLoading = false;
        })
        .catch(() => {
          this.isError = true;
        })
  }
}

</script>

<style scoped>
.lessons-list {
  display: flex;
}
</style>