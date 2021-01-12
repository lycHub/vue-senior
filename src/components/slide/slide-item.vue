<template>
  <transition :name="transitionName">
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
        show: false,
        reverse: false
      }
    },
    computed: {
      transitionName() {
        return this.reverse ? 'slide-reverse' : 'slide';
      }
    },
  }
</script>

<style scoped lang="less">
  .slide-item {

  }

  .slide-enter-active, .slide-leave-active, .slide-reverse-enter-active, .slide-reverse-leave-active {
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


  .slide-reverse-enter {
    transform: translateX(-100%);
  }
  .slide-reverse-enter-to {
    transform: translateX(0);
  }
  .slide-reverse-leave-to {
    transform: translateX(100%);
  }
</style>
