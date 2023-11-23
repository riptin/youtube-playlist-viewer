<script setup>
const props = defineProps(['playlistItem'])

function formatDate(date) {
  if (!date || date === 'undefined') return 'N/A'

  const dateObj = new Date(Date.parse(date))
  return `${dateObj.getDate().toString().padStart(2, '0')}-${(
    dateObj.getMonth() + 1
  )
    .toString()
    .padStart(2, '0')}-${dateObj.getFullYear()} ${dateObj
    .getHours()
    .toString()
    .padStart(2, '0')}-${dateObj.getMinutes().toString().padStart(2, '0')}`
}
</script>

<template>
  <div
    :class="[
      'single-item',
      { deleted: playlistItem.title === 'Deleted video' },
      { private: playlistItem.title === 'Private video' },
    ]"
  >
    <div class="cell video-position">
      <div class="value">{{ playlistItem.position }}</div>
    </div>
    <div class="cell video-title">
      <div class="value">{{ playlistItem.title }}</div>
    </div>
    <div class="cell video-description">
      <div class="value">{{ playlistItem.description }}</div>
    </div>
    <div class="cell video-thumbnail">
      <div class="value">
        <img
          v-if="playlistItem.thumbnail"
          :src="playlistItem.thumbnail"
          alt="video-thumbnail"
        />
      </div>
    </div>
    <div class="cell video-id">
      <div class="value">
        <a
          target="_blank"
          :href="'https://www.youtube.com/watch?v=' + playlistItem.videoId"
          >{{ playlistItem.videoId }}</a
        >
      </div>
    </div>
    <div class="cell video-add-date">
      <div class="value">{{ formatDate(playlistItem.addedAt) }}</div>
    </div>
    <div class="cell video-upload-date">
      <div class="value">{{ formatDate(playlistItem.uploadedAt) }}</div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.single-item {
  display: grid;
  grid-auto-columns: 3fr 3fr 3fr 2fr 2fr 2fr 2fr;
  grid-auto-flow: column;
  gap: 5px;
  border-bottom: 1px solid #000;
  overflow: hidden;

  &.deleted,
  &.private {
    background: #9797976e;
  }

  .cell {
    overflow: hidden;
    height: 50px;
    padding: 0 4px 0 2px;
    margin-top: 6px;
    margin-bottom: 6px;
    font-size: 13px;

    &.video-position,
    &.video-id,
    &.video-add-date,
    &.video-upload-date {
      display: flex;
      align-items: center;
    }

    &.video-title,
    &.video-description {
      overflow-y: auto;
    }

    &.video-thumbnail {
      height: 100%;
      padding: 2px;
      margin: 0;
      .value {
        height: 100%;
        img {
          width: 100%;
          height: 100%;
        }
      }
    }

    &.video-position {
      .value {
        font-size: 18px;
      }
    }
    &.video-description {
      .value {
        width: 100%;
        word-break: break-word;
      }
    }
    &.video-id {
      .value {
        font-size: 14px;
        &:hover {
          color: #00671a;
        }
      }
    }
    .value {
      width: 100%;
    }
  }
}
</style>
