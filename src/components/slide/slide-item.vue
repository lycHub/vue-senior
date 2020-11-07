<template>
  <transition name="slide">
    <div class="slide-item" v-show="show">
      <slot />
    </div>
  </transition>
</template>

<script>
  export default {
    name: 'slide-item',
    props: {
      name: {
        type: String,
        required: true
      }
    },
    data () {
      return {
        show: false
      }
    }
  }
</script>

<style scoped lang="less">
  .slide-item {

  }

  .slide-enter-active, .slide-leave-active {
    position: absolute;
    left: 0;
    right: 0;
    transition: transform .3s;
  }
  .slide-enter {
    transform: translateX(100%);
  }
  .slide-enter-to {
    transform: translateX(0);
  }
  .slide-leave-to {
    transform: translateX(-100%);
  }
</style>
