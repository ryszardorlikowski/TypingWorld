<template>
  <div>
    <LoadingBoard v-if="isLoading"/>
    <ErrorBoard v-else-if="isError"/>
    <div v-else-if="!finishExercise" ref="main_text" class="main-text" style="position: relative">
      <span
          v-for="(char, index) in lessonData.content"
          :key="index"
          :class="{'underline': charNumber===index,
          'correct': charIsValid(char, index),
          'invalid': !charIsValid(char, index) && (index < verificationList.length) }"
      >
        <span v-if="char==='*'">[ENTER]<br>
        </span>
        <span v-else>
        {{ char }}
          </span>
      </span>
    </div>
    <div v-else class="finish-board">

      Speed: {{ parseInt((countWords/((endTime-startTime)/1000).toFixed(2))*60)}}wpm<br>
      Accuracy: {{ ((1-errorsCount/lessonData.content.length).toFixed(2))*100}}%<br><br>
      <router-link :to="{name: 'Dashboard'}">Back to Dashboard</router-link>
    </div>
  </div>
</template>

<script>
import apiClient from "@/services/api";
import LoadingBoard from "@/components/LoadingBoard";
import ErrorBoard from "@/components/ErrorBoard";
import soundSource from '@/assets/key_sound.wav'

export default {
  name: 'Lesson',
  data() {
    return {
      lessonData: null,
      lessonId: null,
      charNumber: 0,
      verificationList: [],
      enterCount: 0,
      errorsCount: 0,
      isLoading: false,
      isError: false,
      keySound: new Audio(soundSource),
      startTime: 0,
      endTime: 0,
      finishExercise: false,
      countWords: 0,


    }
  },
  components: {
    LoadingBoard,
    ErrorBoard,
  },
  methods: {
    typing(key) {
      if (this.charNumber < this.lessonData.content.length && !this.finishExercise) {
        if (this.lessonData.content[this.charNumber] === '*') {
          this.enterCount++;
          if (key === 13) {
            this.verificationList.push('*')
          } else {
            this.verificationList.push(String.fromCharCode(key))
          }
        } else {
          this.verificationList.push(String.fromCharCode(key))
        }

        if (!this.charIsValid(this.lessonData.content[this.charNumber], this.charNumber)) {
          this.errorsCount++;
        }
        this.charNumber++;
        this.playKeySound();
      }

      if(!this.startTime){
        this.startTime = new Date().getTime();
      }
      if(this.charNumber===this.lessonData.content.length && !this.finishExercise){
        this.endTime = new Date().getTime();
        this.finishExercise = true;
      }
      event.preventDefault();
    },
    pressEnter(){

    },
    deleteChar() {
        this.playKeySound();
        this.charNumber--;
        this.verificationList.pop();
        if (this.lessonData.content[this.charNumber] === '*') {
          this.enterCount--;
        }
    },
    charIsValid(char, index) {
      if (char === '*') {
        return this.verificationList[index] === '*';
      }
      return char === this.verificationList[index];
    },
    playKeySound() {
      this.keySound.currentTime = 0;
      this.keySound.play();
    }
  }
  ,
  watch: {
    enterCount(val) {
      this.$refs.main_text.scroll(0, val * (window.innerWidth / 100) * 4)
    },

  }
  ,
  created() {
    this.lessonId = this.$route.params.lessonId;

    this.isLoading = true;

    apiClient.getLesson(this.lessonId)
        .then(({data}) => {
          this.lessonData = data;
          this.isLoading = false;
          this.countWords = this.lessonData.content.split(/[ /*]+/).length;
          window.addEventListener('keypress', event => this.typing(event.keyCode));
          window.addEventListener('keydown', event => {
            if ((event.keyCode === 8 || event.keyCode === 46) && this.charNumber>0){
              this.deleteChar()
            }
          });
        })
        .catch(() => {
          this.isLoading = false;
          this.isError = true;
        });


  }
  ,
}
</script>

<style scoped>
.main-text {
  border: 2px solid #000;
  padding: 15px;
  font-size: 2vw;
  border-radius: 10px;
  max-height: 220px;
  overflow: hidden;
  scroll-behavior: smooth;
}

.main-text span {
  padding: 2px;
  margin-top: 1px;
  line-height: 2;

}

.underline {
  border-bottom: 5px solid #000
}

.correct {
  background: rgba(0, 128, 0, 0.2);
}

.invalid {
  background: rgba(128, 0, 0, 0.2);
}

.finish-board{
  text-align: center;
}
</style>