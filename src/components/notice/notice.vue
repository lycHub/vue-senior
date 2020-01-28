<template>
  <transition name="notice" @after-enter="afterEnter" @after-leave="afterLeave">
    <div
            :class="['gl-notice', 'gl-notice-' + type]"
            v-show="visible"
            :style="{ top: offsetTop + 'px' }"
            @mouseenter="clearTimer"
            @mouseleave="createTimer">
      <div class="gl-notice-content">
        <render-cell :render="render" v-if="render"></render-cell>
        <div class="gl-notice-desc" v-else>{{content}}</div>
        <i class="gl-notice-close" @click="close">X</i>
      </div>
    </div>
  </transition>
</template>

<script>
  import RenderCell from '../base/render'
  export default {
    name: "Notice",
    components: { RenderCell },
    props: {
      content: {
        type: String,
        default: ''
      },
      duration: {
        type: Number,
        default: 3000
      },
      onClosed: Function,
      render: Function
    },
    data() {
      return {
        timer: null,
        visible: false,
        offsetTop: 14,
        height: 0,
        type: 'info'
      }
    },
    watch: {
      visible(newVal) {
        // console.log('visible', newVal);
        if (newVal) {
          if (this.duration) {
            this.createTimer();
          }
        } else {
          this.clearTimer();
        }
      }
    },
    mounted() {
      console.log('mounted');
    },
    methods: {
      close() {
        this.$emit('close');
      },
      createTimer() {
        this.clearTimer();
        this.timer = setTimeout(() => this.close(), this.duration);
      },
      clearTimer () {
        if (this.timer) {
          clearTimeout(this.timer);
          this.timer = null;
        }
      },
      afterEnter() {
        this.height = this.$el.offsetHeight;
        this.$emit('entered');
      },
      afterLeave() {
        this.$emit('closed', this);
      }
    },
    beforeDestory() {
      console.log('beforeDestory');
      this.$emit('bd');
      this.clearTimer();
    },
    destory() {
      console.log('destory');
      this.$emit('bd');
      this.clearTimer();
    }
  }
</script>
