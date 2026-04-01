<template>
  <div id="app">
    <Home />
  </div>
</template>

<script setup>
import Home from './views/Home.vue'
</script>

<style>
* { margin: 0; padding: 0; box-sizing: border-box; }
body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  background: #f5f5f7;
  color: #1d1d1f;
  min-height: 100vh;
}
#app { min-height: 100vh; }
button { cursor: pointer; font-family: inherit; }
input, textarea, select { font-family: inherit; }
</style>
