<script setup>
import PlaylistItem from '@/components/index-page/PlaylistItem.vue'
import { storeToRefs } from 'pinia'
import { usePlaylitStore } from '@/stores/playlist'

const store = usePlaylitStore()
const { playlistItems, playlistLoading } = storeToRefs(store)
</script>

<template>
  <div :class="['playlist-items', { active: playlistLoading === 'loaded' }]">
    <PlaylistItem
      v-for="playlistItem in playlistItems"
      :playlistItem="playlistItem"
    />
  </div>
</template>

<style scoped lang="scss">
.playlist-items {
  display: none;
  flex-direction: column;
  &.active {
    display: flex;
  }

  ::-webkit-scrollbar {
    width: 5px;
    height: 5px;
  }
}
</style>
