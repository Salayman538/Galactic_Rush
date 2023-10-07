<script lang="ts">
// @ts-ignore
import init from '../javascript/function-init.js'
import { defineComponent, onMounted, ref } from 'vue'

export default defineComponent({
  name: 'Canvas',
  components: {},
  setup() {
    const myCanvas = ref<HTMLCanvasElement | null>(null)
    const planets: object[] = []
    const ctx = ref<CanvasRenderingContext2D | null>(null)

    const isVisible = ref<boolean>(false)
    const name = ref<string>('')
    const discription = ref<string>('')

    function handleClick(e: MouseEvent) {
      planets.forEach((planet: any) => {
        if (planet.clickCircle(e.clientX, e.clientY)) {
          isVisible.value = true
          name.value = planet.name
          discription.value = planet.discription
        }
      })
    }

    onMounted(() => {
      const canvas: any = myCanvas.value
      ctx.value = canvas.getContext('2d')

      canvas.width = innerWidth
      canvas.height = innerHeight

      init(planets, canvas)

      function animate() {
        requestAnimationFrame(animate)
        const canvasCtx = ctx.value
        if (canvasCtx) {
          canvasCtx.clearRect(0, 0, canvas.width, canvas.height)
          planets.forEach((planet: any) => {
            planet.update(canvasCtx)
          })
        }
      }

      animate()
    })

    return {
      myCanvas,
      isVisible,
      name,
      discription,
      handleClick
    }
  }
})
</script>

<template>
  <canvas ref="myCanvas" @click="handleClick"></canvas>
  <div class="wrapper">
    <div class="planet-info" v-show="isVisible">
      <p class="planet-name">{{ name }}</p>
      <p class="planet-discription">{{ discription }}</p>
      <p class="planet-info-close" @click="isVisible = false">X</p>
    </div>
  </div>
</template>

<style scoped>
canvas {
  position: absolute;
  top: 0;
  left: 0;
}

.wrapper {
  position: absolute;
  left: 50%;
  top: 40%;
}

.planet-info {
  position: relative;
  left: -50%;
  top: -40%;
  margin: auto;
  font-family: polish;
  text-align: center;
  padding: 0.5rem;
  border-radius: 10px;
  background-color: rgba(54, 75, 68, 0.9);
  color: white;
}

.planet-name {
  font-size: 2rem;
  color: #68edcb;
}

.planet-info-close {
  position: absolute;
  top: 3px;
  right: 8px;
  font-size: 2rem;
  cursor: pointer;
}
</style>
