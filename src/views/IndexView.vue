<script setup>
import { usePlaylitStore } from '@/stores/playlist'
import { storeToRefs } from 'pinia'
import ListHeader from '@/components/index-page/ListHeader.vue'
import ActionPanel from '@/components/index-page/ActionPanel.vue'
import ExtraInfo from '@/components/index-page/ExtraInfo.vue'
import List from '@/components/index-page/List.vue'
import Loader from '@/components/index-page/Loader.vue'

const store = usePlaylitStore()
const { playlistLoading } = storeToRefs(store)
</script>

<template>
  <div class="index-page">
    <h1 class="header-title">Youtube Playlist Viewer</h1>
    <ActionPanel />
    <ExtraInfo />
    <div :class="['playlist-items-wrapper', { active: playlistLoading }]">
      <ListHeader />
      <List />
      <Loader />
    </div>
  </div>
</template>

<style lang="scss">
.index-page {
  display: flex;
  flex-direction: column;
  height: 100%;
  .header-title {
    width: 100%;
    padding-top: 30px;
    margin-bottom: 50px;
    font-size: 30px;
    text-align: center;
  }
  .playlist-items-wrapper {
    position: relative;
    display: none;
    width: 100%;
    flex-grow: 1;
    &.active {
      display: block;
    }
  }
}
</style>
