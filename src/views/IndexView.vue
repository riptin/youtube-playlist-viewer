<script setup>
import { ref } from 'vue'
import { usePlaylitStore } from '@/stores/playlist'
import { storeToRefs } from 'pinia'
import ListHeader from '@/components/ListHeader.vue'
import List from '@/components/List.vue'

const store = usePlaylitStore()
const { playlistName, videoCount, unavailableVideoCount } = storeToRefs(store)
const playlistId = ref('')

const getPlaylist = () => {
  if (!playlistId.value) return console.log('no playlist id')
  store.$reset()
  store.getPlaylist(playlistId.value)
  store.getPlaylistName(playlistId.value)
}
const exportPlaylist = () => {
  console.log('playlist items')
  console.log(store.playlistItems)
  store.exportPlaylist()
}
</script>

<template>
  <div class="index-page">
    <h1 class="header-title">Youtube Playlist Viewer</h1>
    <div class="action-panel">
      <input
        class="input"
        id="playlist-id-input"
        name="playlist-id"
        placeholder="Youtube Playlist ID"
        v-model="playlistId"
      />
      <input
        class="button get-playlist"
        id="view-playlist-button"
        type="submit"
        value="View Playlist"
        @click="getPlaylist"
      />
      <input
        class="button export-playlist"
        id="export-playlist-button"
        type="submit"
        value="Export Playlist"
        @click="exportPlaylist"
      />
    </div>
    <div :class="['extra-info', { active: playlistName }]">
      <div class="playlist-name">{{ playlistName }}</div>
      <div class="video-num">
        Videos: <label>{{ videoCount }}</label>
      </div>
      <div class="unavailable-video-num">
        Unavailable: <label>{{ unavailableVideoCount }}</label>
      </div>
    </div>
    <div class="playlist-items-wrapper">
      <ListHeader />
      <List />
    </div>
  </div>
</template>

<style lang="scss">
.header-title {
  width: 100%;
  padding-top: 30px;
  margin-bottom: 50px;
  font-size: 30px;
  text-align: center;
}
.action-panel {
  display: flex;
  margin-bottom: 20px;

  .input,
  .button {
    padding: 10px 20px;
    border-radius: 20px;
    border: 1px solid transparent;
    font-size: 16px;
    color: #00290a;
    background-color: #9ac48c;
  }
  .input {
    width: -webkit-fill-available;
    &::placeholder {
      color: #00290a;
      opacity: 0.6;
    }
    &:focus {
      border: 1px solid #fff !important;
    }
  }

  .button {
    margin-left: 10px;
    cursor: pointer;
    &:active {
      transform: translate(1px, 1px);
    }
  }
}
.extra-info {
  display: none;
}
.extra-info.active {
  display: flex;
}
.extra-info .playlist-name,
.extra-info .video-num {
  margin-right: 20px;
}

.playlist-items-wrapper {
  position: relative;
  width: 100%;
}
</style>
