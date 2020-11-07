<template>
  <div class="slide">
    <slot />
    <div class="direct">
      <button>to left</button>
      <button>to right</button>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'slide',
    props: {
      value: {
        type: String,
        default: ''
      }
    },
    data () {
      return {
        current: this.value,
        children: []
      }
    },
    watch: {
      value (newVal) {
        this.current = newVal;
      }
    },
    methods: {

    },
    mounted() {
      if (this.$children.length) {
        this.current = this.current || this.$children[0].name;
        this.$children.forEach(item => {
          item.show = item.name === this.current;
        });
      }
    }
  }
</script>

<style scoped lang="less">
  .slide {
    .direct {
      button {
        padding: 10px;
      }
    }
  }
</style>
