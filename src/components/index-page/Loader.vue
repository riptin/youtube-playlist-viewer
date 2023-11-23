<script setup>
import { storeToRefs } from 'pinia'
import { usePlaylitStore } from '@/stores/playlist'
import RotateArrow from '@/components/icons/RotateArrow.vue'

const store = usePlaylitStore()
const { playlistLoading } = storeToRefs(store)
</script>

<template>
  <div
    v-if="playlistLoading === 'loading'"
    :class="['loader', { active: playlistLoading === 'loading' }]"
  >
    <RotateArrow />
  </div>
</template>

<style scoped lang="scss">
@mixin animate($animation, $duration, $method, $times) {
  animation: $animation $duration $method $times;
}

@mixin keyframes($name) {
  @keyframes #{$name} {
    @content;
  }
}
.loader {
  display: none;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  background: #fff;
  &.active {
    display: flex;
  }

  svg {
    width: 30px;
    height: 30px;
    @include keyframes(rotate) {
      0% {
        transform: rotate(0);
      }
      50% {
        transform: rotate(180deg);
      }
      100% {
        transform: rotate(360deg);
      }
    }
    @include animate(rotate, 1s, linear, infinite);
  }
}
</style>
