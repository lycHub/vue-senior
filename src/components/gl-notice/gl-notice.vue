<template>
  <transition name="notice" @after-enter="afterEnter" @after-leave="afterLeave">
    <div
      :class="['gl-notice', 'gl-notice-' + type]"
      v-show="visibility"
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
  import {normalGap} from "./index";
  import RenderCell from '../base/render';
  export default {
    name: "glNotice",
    components: { RenderCell },
    model: {
      prop: 'visible',
      event: 'close'
    },
    props: {
      content: {
        type: [String, Number],
        default: ''
      },
      visible: {
        type: Boolean,
        default: false
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
        visibility: false,
        offsetTop: normalGap,
        height: 0,
        timer: null,
        type: 'info'
      }
    },
    watch: {
      visible(newVal) {
        this.visibility = newVal;
        if (newVal) {
          if (this.duration) {
            this.createTimer();
          }
        } else {
          this.clearTimer();
        }
      },
    },
    methods: {
      afterEnter() {
        this.height = this.$el.offsetHeight;
      },
      afterLeave() {
        this.$emit('closed', this);
      },
      close() {
        this.$emit('close');
      },
      createTimer() {
        if (!this.$isServer) {
          this.clearTimer();
          this.timer = setTimeout(() => this.close(), this.duration);
        }
      },
      clearTimer () {
        if (this.timer) {
          clearTimeout(this.timer);
          this.timer = null;
        }
      },
    },
    beforeDestroy() {
      this.clearTimer();
    }
  }
</script>
