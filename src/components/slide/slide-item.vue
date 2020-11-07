<template>
  <div class="slide-item" v-show="show">
    <slot />
  </div>
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
</style>
