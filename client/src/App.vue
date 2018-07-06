<template>
  <div id="app">
    <repositories></repositories>
  </div>
</template>

<script>
import Repositories from './components/Repositories.vue'

export default {
  name: 'app',
  components: {
    Repositories
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
