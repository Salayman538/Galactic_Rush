<script lang="ts">
import { defineComponent, ref } from 'vue'
import ScoreBoard from '../components/ScoreBoard.vue'
import Canvas from '../components/Canvas.vue'

export default defineComponent({
  name: 'WelcomeScreen',
  components: {
    ScoreBoard,
    Canvas
  },
  data() {
    return {
      isVisible: ref(true)
    }
  },
  methods: {
    onClick() {
      this.isVisible = false
    }
  }
})
</script>

<template>
  <Transition name="fade-out">
    <div v-if="isVisible">
      <header>
        <h1 class="welcome-text">Galactic Rush</h1>
      </header>
      <div class="welcome-button-wrapper">
        <button class="start-button" @click="onClick()">Rozpocznij</button>
      </div>
    </div>
  </Transition>

  <Transition name="fade-in">
    <div v-if="!isVisible">
      <ScoreBoard></ScoreBoard>
      <Canvas></Canvas>
    </div>
  </Transition>
</template>

<style scoped>
.fade-in-enter-from,
.fade-out-leave-to {
  opacity: 0;
}

.fade-out-leave-active {
  transition: opacity 1s ease;
}

.fade-in-enter-active {
  transition: opacity 2s ease;
}

@keyframes welcome-text-animation {
  0% {
    text-shadow: #4d00c1 10px 10px;
  }
  50% {
    text-shadow: #7b35ea 7px 7px;
  }
  100% {
    text-shadow: #3f00b6 10px 10px;
  }
}

.welcome-text {
  text-align: center;
  margin: 0 auto;
  font-size: 4.8rem;
  color: white;
  animation-name: welcome-text-animation;
  animation-duration: 2s;
  animation-iteration-count: infinite;
}

.welcome-button-wrapper {
  display: grid;
  place-items: center;
  height: 76vh;
}

.start-button {
  background-color: #201e2cc8;
  border: #222137;
  border-radius: 2vw;
  color: white;
  padding: 1vw;
  cursor: pointer;
  font-size: 2rem;
  font-family: main;
}
</style>
