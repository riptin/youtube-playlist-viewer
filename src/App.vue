<script setup>
// TODO
// optimise store
// optimise sorting
// hide unavailable videos checkbox
// proper error handling
// ?add video length attribute
// download video
// add playlist url to url bar
</script>

<template>
  <div class="wrapper">
    <router-view />
  </div>
</template>

<style lang="scss">
::-webkit-scrollbar {
  width: 10px;
  height: 10px;
}
::-webkit-scrollbar-track {
  background: #9ac48c;
  border-radius: 20px;
}
::-webkit-scrollbar-thumb {
  background: #00671a85;
  border-radius: 20px;
}
::-webkit-scrollbar-thumb:hover {
  background: #00290a;
}
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
  height: 100%;
}
</style>
