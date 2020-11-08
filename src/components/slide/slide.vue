<template>
  <div class="slide">
    <div
      class="views"
      @touchstart="touchstart"
      @touchmove="touchmove"
      @touchend="touchend"
    >
      <slot />
    </div>
    <div class="direct">
      <button @click="prev">to left</button>
      <button @click="next">to right</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "slide",
  props: {
    value: {
      type: String,
      default: "",
    },
    autoplay: {
      type: Number,
      default: 2000,
    },
  },
  data() {
    return {
      current: this.value,
      children: [],
      reverse: false,
      interval: null,
    };
  },
  computed: {
    currentIndex() {
      return this.$children.findIndex((item) => item.name === this.current);
    },
  },
  watch: {
    value(newVal) {
      console.log("value :>> ", newVal);
      this.current = newVal;
      this.refresh();
    },
  },
  methods: {
    touchstart() {
      console.log("touchstart");
      this.clearInterval();
    },
    touchmove() {
      console.log("touchmove");
    },
    touchend() {
      console.log("touchend");
      this.run();
    },
    refresh() {
      if (this.$children.length) {
        if (this.current) {
          this.$children.forEach((item) => {
            item.show = item.name === this.current;
            item.reverse = this.reverse;
          });
        } else {
          this.change(this.$children[0].name);
        }
      }
    },
    run() {
      if (this.autoplay > 0) {
        this.interval = setInterval(() => {
          this.reverse = false;
          let currentIndex = this.currentIndex;
          currentIndex = (currentIndex + 1) % this.$children.length;
          this.change(this.$children[currentIndex].name);
        }, this.autoplay);
      }
    },
    prev() {
      const currentIndex =
        this.currentIndex > 0
          ? this.currentIndex - 1
          : this.$children.length - 1;
      this.reverse = true;
      this.change(this.$children[currentIndex].name);
    },
    next() {
      const currentIndex = (this.currentIndex + 1) % this.$children.length;
      this.reverse = false;
      this.change(this.$children[currentIndex].name);
    },
    change(value) {
      this.$emit("input", value);
      this.$emit("change", value);
    },
    clearInterval() {
      if (this.interval) {
        clearInterval(this.interval);
        this.interval = null;
      }
    },
  },
  mounted() {
    this.refresh();
    this.run();
  },
  beforeDestroy() {
    this.clearInterval();
  },
};
</script>

<style scoped lang="less">
.slide {
  .views {
    position: relative;
    min-height: 150px;
  }
  .direct {
    button {
      padding: 10px;
    }
  }
}
</style>
