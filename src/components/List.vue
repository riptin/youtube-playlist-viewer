<script setup>
import PlaylistItem from '@/components/PlaylistItem.vue'
import { storeToRefs } from 'pinia'
import { usePlaylitStore } from '@/stores/playlist'

const store = usePlaylitStore()
const { playlistItems } = storeToRefs(store)
</script>

<template>
  <div class="playlist-items">
    <PlaylistItem
      v-for="playlistItem in playlistItems"
      :playlistItem="playlistItem"
    />
  </div>
</template>

<style scoped lang="scss">
.playlist-items {
  display: flex;
  flex-direction: column;

  ::-webkit-scrollbar {
    width: 5px;
    height: 5px;
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
}
</style>
