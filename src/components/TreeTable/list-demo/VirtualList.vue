<template>
  <div
    class="virtual-list"
    @scroll="onScroll"
    :style="{ maxHeight: maxHeight + 'px', overflowY: 'auto' }">
    <div
      class="main-box"
      :style="{ paddingTop: base.paddingTop + 'px', paddingBottom: base.paddingBottom + 'px' }">
      <slot v-if="customForOf" />
      <template v-else>
        <template v-for="(item, index) of visibleList">
          <slot :item="item" :index="base.start + index" />
        </template>
      </template>
    </div>
  </div>
</template>
<script>
import { debounce } from 'lodash';

export default {
  name: 'VirtualList',
  props: {
    list: {
      type: Array,
      default: () => []
    },
    customForOf: {
      type: Boolean,
      default: false
    },
    size: {
      type: Number,
      required: true
    },
    remain: {
      type: Number,
      required: true
    },
    start: {
      type: Number,
      default: 0
    },
    offset: { // 设置scrollTop
      type: Number,
      default: 0
    },
    additional: { // 额外渲染多少个节点？
      type: Number,
      default: 0
    },
    debounce: {
      type: Number,
      default: 0
    }
  },
  data () {
    return {
      base: Object.preventExtensions({
        start: 0,
        end: 0,
        scrollTop: 0,
        paddingTop: 0,
        paddingBottom: 0
      }),
      visibleList: []
    }
  },
  computed: {
    keeps () {
      return this.remain + (this.additional || this.remain);
    },
    maxHeight () {
      return this.size * this.remain;
    }
  },
  watch: {
    list () {
      this.onScroll(true);
    }
  },

  methods: {
    onScroll (forceUpdate = false) {
      if (this.list.length > this.keeps) {
        this.updateZone(this.$el.scrollTop, forceUpdate === true);
      } else {
        this.refresh();
      }
    },
    updateZone (offset, forceUpdate) {
      // console.log('updateZone', forceUpdate);
      const overs = Math.floor(offset / this.size);
      const zone = this.getZone(overs);
      const additional = this.additional || this.remain;
      let shouldRefresh = false;
      if (forceUpdate) {
        shouldRefresh = true;
      } else {
        if (overs < this.base.start) { // 向上滚
          shouldRefresh = true;
        } else {
          if (zone.isLastZone) {
            if ((this.base.start !== zone.start) || (this.base.end !== zone.end)) {
              shouldRefresh = true;
            }
          } else {
            shouldRefresh = overs >= this.base.start + additional;
          }
        }
      }
      // console.log('shouldRefresh', shouldRefresh);
      if (shouldRefresh) {
        this.base.start = zone.start;
        this.base.end = zone.end;
        this.updateContainer();
        this.updateVisibleList();
      }
    },
    getZone (startIndex) {
      let start = Math.max(0, startIndex);
      const remainCount = this.list.length - this.keeps;
      const isLastZone = start >= remainCount;
      if (isLastZone) {
        start = Math.max(0, remainCount);
      }
      return {
        start,
        end: this.getEndIndex(start),
        isLastZone
      };
    },
    refresh (init = false) {
      if (init) {
        this.base.start = this.list.length > this.start + this.keeps ? this.start : 0;
      } else {
        this.base.start = 0;
      }
      this.base.end = this.getEndIndex(this.base.start);
      this.updateContainer();
      this.updateVisibleList();
    },
    getEndIndex (start) {
      const end = start + this.keeps - 1;
      return this.list.length ? Math.min(this.list.length - 1, end) : end;
    },
    updateContainer () {
      const total = this.list.length;
      const needPadding = total > this.keeps;
      const paddingTop = this.size * (needPadding ? this.base.start : 0);
      let paddingBottom = this.size * (needPadding ? total - this.keeps : 0) - paddingTop;
      if (paddingBottom < this.size) {
        paddingBottom = 0;
      }
      this.base.paddingTop = paddingTop;
      this.base.paddingBottom = paddingBottom;
    },
    filterNodes () {
      if (this.list.length) {
        const nodes = [];
        for (let a = this.base.start; a <= this.base.end; a++) {
          nodes.push(this.list[a]);
        }
        return nodes;
      }
      return [];
    },
    updateVisibleList () {
      if (this.customForOf) {
        this.$emit('range', {
          start: this.base.start,
          end: this.base.end
        })
      } else {
        this.visibleList = this.filterNodes();
      }
    },
    addScrollListener (element) {
      this.scrollHandler = this.debounce ? debounce(this.onScroll.bind(this), this.debounce) : this.onScroll;
      element.addEventListener('scroll', this.scrollHandler, false);
    },
    removeScrollListener (element) {
      element.removeEventListener('scroll', this.scrollHandler, false);
    }
  },

  // render (h) {
  //   // const { start, paddingTop, paddingBottom } = this.base;
  //   const rootStyle = {
  //     // maxHeight: this.maxHeight + 'px',
  //     // overflowY: 'auto'
  //   }
  //   const mainBoxStyle = {
  //     // paddingTop: paddingTop + 'px',
  //     // paddingBottom: paddingBottom + 'px'
  //   }
  //   return (
  //
  //   );
  // },

  created () {
    if (this.list.length) {
      this.refresh(true);
    }
  },
  mounted () {
    // console.log(this.$el);
    if (this.start) {
      const start = this.getZone(this.start).start;
      this.setScrollTop(start * this.size);
    } else if (this.offset) {
      this.setScrollTop(this.offset);
    }
  },
  beforeDestroy () {

  }
}

</script>
