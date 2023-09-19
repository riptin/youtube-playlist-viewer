<script setup>
import ArrowBoxIcon from '@/components/icons/IconArrowBox.vue'
import NewWindowIcon from '@/components/icons/IconNewWindow.vue'
import { ref, onMounted } from 'vue'
import { usePlaylitStore } from '@/stores/playlist'
import { storeToRefs } from 'pinia'

const attributeTitles = ref([])
const store = usePlaylitStore()
const { playlistItems, orderByProperty, orderDirection, orderedPlaylist } =
  storeToRefs(store)

onMounted(() => {
  attributeTitles.value = document.querySelectorAll(
    '.attribute:not(.thumbnail)'
  )
  attributeTitles.value.forEach((attributeContainer) => {
    attributeContainer.addEventListener('click', function (e) {
      if (!playlistItems.value.length) return console.log('nothing to sort!')
      const attributeTitle = e.target.closest('.attribute')

      if (attributeTitle.classList.contains('sort')) {
        attributeTitle.classList.toggle('ascending')
        attributeTitle.classList.toggle('descending')
      } else {
        attributeTitles.value.forEach((attributeTitle) =>
          attributeTitle.classList.remove('sort', 'ascending', 'descending')
        )
        attributeTitle.classList.add('sort', 'ascending')
      }

      orderByProperty.value = attributeTitle.id
      orderDirection.value = attributeTitle.classList.contains('descending')
        ? 'descending'
        : 'ascending'

      playlistItems.value = orderedPlaylist.value
    })
  })
})
</script>

<template>
  <div class="attribute-titles">
    <div id="position" class="attribute video-position">
      <div class="name">Position</div>
      <div class="sort-icon"><ArrowBoxIcon /></div>
    </div>
    <div id="title" class="attribute title">
      <div class="name">Title</div>
      <div class="sort-icon">
        <ArrowBoxIcon />
      </div>
    </div>
    <div id="description" class="attribute description">
      <div class="name">Description</div>
      <div class="sort-icon">
        <ArrowBoxIcon />
      </div>
    </div>
    <div id="thumbnail" class="attribute thumbnail">
      <div class="name">Thumbnail</div>
    </div>
    <div id="videoId" class="attribute video-id">
      <div class="name">Video ID<NewWindowIcon /></div>
      <div class="sort-icon">
        <ArrowBoxIcon />
      </div>
    </div>
    <div id="addedAt" class="attribute date-added">
      <div class="name">Date Added</div>
      <div class="sort-icon">
        <ArrowBoxIcon />
      </div>
    </div>
    <div id="uploadedAt" class="attribute date-uploaded">
      <div class="name">Date Uploaded</div>
      <div class="sort-icon">
        <ArrowBoxIcon />
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.attribute-titles {
  position: sticky;
  top: 0;
  display: grid;
  grid-auto-columns: 3fr 3fr 3fr 2fr 2fr 2fr 2fr;
  grid-auto-flow: column;
  gap: 5px;
  border-bottom: 1px solid #000;
  overflow: hidden;
  height: 63px;
  background: #fff;
  user-select: none;
}

.attribute.video-id .name {
  display: flex;
  align-items: center;
}
.attribute.video-id svg {
  width: 16px;
  height: 16px;
  margin-left: 2px;
}

.attribute {
  display: flex;
  align-items: center;
  margin: 20px auto 20px 0;
  font-size: 16px;
  font-weight: bold;
}

.attribute:not(.thumbnail) .name {
  cursor: pointer;
}

.attribute-titles .attribute .sort-icon {
  margin-left: 2px;
  opacity: 0;
  transition: opacity 0.2s;
  cursor: pointer;
}
.attribute-titles .attribute.sort .sort-icon,
.attribute-titles .attribute:hover .sort-icon {
  opacity: 1;
}
.attribute-titles .attribute:active .sort-icon {
  scale: 1.1;
}
.attribute-titles .attribute .sort-icon svg {
  width: 16px;
  height: 16px;
  transition: transform 0.2s;
}

.attribute-titles .attribute.descending .sort-icon svg {
  transform: rotate(180deg);
}
</style>
