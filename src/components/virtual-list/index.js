import { debounce } from 'lodash';

export default {
  name: 'VirtualList',
  props: {
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
    bench: { // 额外渲染多少个节点？
      type: Number,
      default: 0
    },
    scrollelement: {
      type: typeof window === 'undefined' ? Object : HTMLElement,
      default: null
    },
    debounce: {
      type: Number,
      default: 0
    }
  },
  data () {
    const start = this.start >= this.remain ? this.start : 0;
    const keeps = this.remain + (this.bench || this.remain);
    return {
      delta: Object.preventExtensions({
        direction: '',
        scrollTop: 0,
        start, // 初始化的时候显示第几个（待测试）
        end: start + keeps - 1, // 最后一个实体item的索引
        keeps,
        total: 0,
        offsetAll: 0, // 可滚动距离
        paddingTop: 0,
        paddingBottom: 0
      })
    }
  },
  watch: {
    scrollelement (newVal, oldVal) {
      if (oldVal) {
        this.removeScrollListener(oldVal);
      }
      if (newVal) {
        this.addScrollListener(newVal);
      }
    }
  },
  mounted () {
    if (this.scrollelement) {
      this.addScrollListener(this.scrollelement)
    }
    if (this.start) {
      const start = this.getZone(this.start).start;
      this.setScrollTop(start * this.size);
    } else if (this.offset) {
      this.setScrollTop(this.offset);
    }
  },

  methods: {
    addScrollListener (element) {
      this.scrollHandler = this.debounce ? debounce(this.onScroll.bind(this), this.debounce) : this.onScroll;
      element.addEventListener('scroll', this.scrollHandler, false);
    },
    removeScrollListener (element) {
      element.removeEventListener('scroll', this.scrollHandler, false);
    },
    onScroll () {
      const delta = this.delta;
      let offset = this.$el?.scrollTop || 0;
      if (this.scrollelement) {
        const scrollelementRect = this.scrollelement.getBoundingClientRect();
        const elemRect = this.$el.getBoundingClientRect();
        offset = scrollelementRect.top - elemRect.top;
      }
      // console.log('offset', offset);
      delta.direction = offset > delta.scrollTop ? 'D' : 'U';
      delta.scrollTop = offset;

      if (delta.total > delta.keeps) {
        this.updateZone(offset);
      } else {
        // console.log('set end', delta.total - 1);
        delta.end = delta.total - 1;
      }
    },

    updateZone (offset) {
      const delta = this.delta;

      // 当前滚过了多少个item
      let overs = Math.floor(offset / this.size);

      // 如果是向上滚，滚过的item应该减少
      // if (delta.direction === 'U') { // ??
      //   overs = overs - this.remain + 1
      // }
      // console.log('overs', overs);
      const zone = this.getZone(overs);
      const bench = this.bench || this.remain;

      // 经过的items超过了bench(10)，就应该渲染下一块区域了，否则说明滚动在区域内，则不更新dom
      // 向下才会是true
      const shouldRenderNextZone = Math.abs(overs - delta.start - bench) === 1
      if (
        !shouldRenderNextZone &&
        (overs - delta.start <= bench) &&
        !zone.isLastZone && (overs > delta.start)
      ) {
        return;
      }

      // 尽量减少forceRender的调用
      if (
        shouldRenderNextZone ||
        zone.start !== delta.start ||
        zone.end !== delta.end
      ) {
        delta.end = zone.end;
        delta.start = zone.start;
        this.forceRender();
      }
    },

    getZone (index) {
      let start, end
      const delta = this.delta;
      index = Math.max(0, index); // 经过了多少个(索引)
      console.log('getZone index', index); // 最多192，很难大于total
      const remainCount = delta.total - delta.keeps; // 总共多少个虚拟节点

      // 滚到了最后一个区域？
      const isLastZone = (index >= remainCount && index <= delta.total) || (index > delta.total);

      if (isLastZone) {
        start = Math.max(0, remainCount);
      } else {
        start = index;
      }
      end = start + delta.keeps - 1;
      if (delta.total && end > delta.total - 1) {
        end = delta.total - 1;
      }
      return {
        end,
        start,
        isLastZone
      }
    },

    // 浏览器下一次重绘时执行,避免短时间内触发大量reflow
    forceRender () {
      window.requestAnimationFrame(() => {
        this.$forceUpdate();
      });
    },

    setScrollTop (scrollTop) {
      if (this.scrollelement) {
        this.scrollelement.scrollTo(0, scrollTop)
      } else {
        this.$el.scrollTop = scrollTop;
      }
    },

    // 根据start、end决定要渲染哪些节点
    filterNodes (h) {
      const delta = this.delta;
      const slots = this.$slots.default || [];

      delta.total = slots.length;
      // if (!slots.length) { 本来就是0
      //   delta.start = 0;
      // }
      const hasPadding = delta.total > delta.keeps;
      const allHeight = this.size * delta.total;
      const paddingTop = this.size * (hasPadding ? delta.start : 0);
      let paddingBottom = this.size * (hasPadding ? delta.total - delta.keeps : 0) - paddingTop;

      if (paddingBottom < this.size) {
        paddingBottom = 0;
      }

      delta.paddingTop = paddingTop;
      delta.paddingBottom = paddingBottom;
      delta.offsetAll = allHeight - this.size * this.remain;

      // fix bug
      delta.end = delta.start + delta.keeps - 1;
      if (delta.total && delta.end > delta.total - 1) {
        delta.end = delta.total - 1;
      }

      const renders = [];
      for (let a = delta.start; a < delta.total && a <= delta.end; a++) {
        renders.push(slots[a]);
      }
      return renders;
    }
  },

  render (h) {
    let list = this.filterNodes(h);
    const { paddingTop, paddingBottom } = this.delta;

    const rootStyle = {
      display: 'block',
      // 'overflow-y': this.size >= this.remain ? 'auto' : 'initial',
      overflowY: 'auto', // 可以接收list数量，结合remain判断是auto还是initial
      maxHeight: this.size * this.remain + 'px'
    }

    const itemWrapStyle = {
      display: 'block',
      paddingTop: paddingTop + 'px',
      paddingBottom: paddingBottom + 'px'
    }

    if (this.scrollelement) {
      return <div class="scroll-el" style={ itemWrapStyle }>{ list }</div>;
    }
    return (
      <div style={ rootStyle } onScroll={ this.onScroll }>
        <div class="scroll-el" style={ itemWrapStyle }>{ list }</div>
      </div>
    );
  },

  beforeDestroy () {
    if (this.scrollelement) {
      this.removeScrollListener(this.scrollelement);
    }
  }
}
