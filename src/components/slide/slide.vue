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
        this.refresh();
      }
    },
    methods: {
      refresh() {
        // 30分钟
        if (this.$children.length) {
          const current = this.current || this.$children[0].name;
          this.$children.forEach(item => {
            item.show = item.name === current;
          });
        }
      }
    },
    mounted() {
      this.refresh();
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
