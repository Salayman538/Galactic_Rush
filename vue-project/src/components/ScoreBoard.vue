<script lang="ts">
import { defineComponent } from 'vue'
import { RouterLink } from 'vue-router'

export default defineComponent({
  name: 'ScoreBoard'
})
</script>

<template>
  <div class="score-board">
    <p>Rekord: 0</p>
    <br />
    <p>Wyniki potrzebne, aby odblokowac informacje o nowej planecie:</p>
    <br />
    <ul>
      <li>Merkury - 500</li>
      <li>Wenus - 1000</li>
      <li>Ziemia - 2000</li>
      <li>Mars - 4000</li>
      <li>Jowisz - 5000</li>
      <li>Saturn - 8000</li>
      <li>Uran - 12000</li>
      <li>Neptun - 17000</li>
    </ul>
    <br />
    <RouterLink to="/game"><button class="start-game-button">Rozpocznij gre</button></RouterLink>
  </div>
</template>

<style scoped>
.score-board {
  width: 18vw;
  height: 42vh;
  position: absolute;
  left: 0;
  top: 0;
  text-align: center;
  color: white;
  background-color: #2f2f2f;
  font-size: 0.9rem;
  padding: 0.6rem;
  border-bottom-right-radius: 15px;
}

.score-board ul {
  list-style-type: none;
  padding: 0;
}

.start-game-button {
  box-shadow: inset 0px 1px 0px 0px #54a3f7;
  background: linear-gradient(to bottom, #007dc1 5%, #0061a7 100%);
  background-color: #4d00c1;
  border-radius: 3px;
  border: 1px solid #124d77;
  display: inline-block;
  cursor: pointer;
  color: #ffffff;
  font-size: 1vmax;
  font-family: main;
  padding: 6px 24px;
  text-decoration: none;
  text-shadow: 0px 1px 0px #154682;
  cursor: pointer;
}
.start-game-button:hover {
  background: linear-gradient(to bottom, #0061a7 5%, #007dc1 100%);
  background-color: #0061a7;
}
.start-game-button:active {
  position: relative;
  top: 1px;
}
</style>
