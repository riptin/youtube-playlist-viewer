<script setup>
// TODO
// optimise store
// handle both playlist id and url
// add loader
// optimise sorting
// ?add video length attribute
</script>

<template>
  <div class="wrapper">
    <router-view />
  </div>
</template>

<style lang="scss">
html {
  height: 100%;
  width: 100%;
}
body {
  height: 100%;
  width: 100%;
  font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
}
#app {
  height: 100%;
}
.wrapper {
  padding: 0 5%;
  min-height: 100%;
}
</style>
