<script setup>
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
import VueMirrorScope from './components/vue-mirror-scope.vue'
const imgList = ['https://picsum.photos/200/300/?random', 'https://picsum.photos/300/300/?random','https://picsum.photos/1920/1080/?random','https://picsum.photos/300/300/?random','https://picsum.photos/300/300/?random','https://picsum.photos/300/300/?random']

</script>

<template>
  <vue-mirror-scope :imgList="imgList"></vue-mirror-scope>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
