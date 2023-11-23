<script setup>
import { ref } from 'vue'
import { usePlaylitStore } from '@/stores/playlist'
import { storeToRefs } from 'pinia'

const playlistId = ref('')
const store = usePlaylitStore()
const { playlistLoading } = storeToRefs(store)

const getPlaylist = () => {
  if (!playlistId.value) return console.log('no playlist id')
  store.$reset()
  store.getPlaylist(playlistId.value)
}
const exportPlaylist = () => {
  if (playlistLoading.value !== 'loaded')
    return console.log('nothing to export')
  store.exportPlaylist()
}
</script>

<template>
  <div class="action-panel">
    <input
      class="input"
      id="playlist-id-input"
      name="playlist-id"
      placeholder="Youtube Playlist ID"
      v-model="playlistId"
    />
    <input
      :class="[
        'button',
        'get-playlist',
        { disabled: playlistLoading === 'loading' },
      ]"
      :disabled="playlistLoading === 'loading' ?? null"
      id="view-playlist-button"
      type="submit"
      value="View Playlist"
      @click="getPlaylist"
    />
    <input
      :class="[
        'button',
        'export-playlist',
        { disabled: playlistLoading !== 'loaded' },
      ]"
      id="export-playlist-button"
      type="submit"
      value="Export Playlist"
      @click="exportPlaylist"
    />
  </div>
</template>

<style scoped lang="scss">
.action-panel {
  display: flex;
  margin-bottom: 20px;

  .input,
  .button {
    padding: 10px 20px;
    border-radius: 20px;
    border: 1px solid transparent;
    font-size: 16px;
    color: #000;
    background-color: #9ac48c;
  }
  .input {
    width: -webkit-fill-available;
    &:-webkit-autofill,
    &:-webkit-autofill:hover,
    &:-webkit-autofill:focus,
    &:-webkit-autofill:active {
      -webkit-box-shadow: 0 0 0 30px #9ac48c inset !important;
    }
    &::placeholder {
      color: #000;
      opacity: 0.7;
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
    &.disabled {
      user-select: none;
      background-color: #2c2c2c;
      color: #fff;
      cursor: inherit;
      &:active {
        transform: initial;
      }
    }
  }
}
</style>
