<script setup>
import { usePlaylitStore } from '@/stores/playlist'
import { storeToRefs } from 'pinia'

const store = usePlaylitStore()
const { playlistName, videoCount, unavailableVideoCount, playlistLoading } =
  storeToRefs(store)
</script>

<template>
  <div :class="['extra-info', { active: playlistLoading === 'loaded' }]">
    <div class="playlist-name">{{ playlistName }}</div>
    <div class="video-num">
      Videos: <label>{{ videoCount }}</label>
    </div>
    <div class="unavailable-video-num">
      Unavailable: <label>{{ unavailableVideoCount }}</label>
    </div>
  </div>
</template>

<style scoped lang="scss">
.extra-info {
  display: none;

  &.active {
    display: flex;
  }
  .playlist-name,
  .video-num {
    margin-right: 20px;
  }
}
</style>
