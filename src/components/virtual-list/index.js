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
    }
  },
  data() {
    const start = this.start >= this.remain ? this.start : 0;
    const keeps = this.remain + (this.bench || this.remain);
    return {
      delta: Object.preventExtensions({
        direction: '',
        scrollTop: 0,
        start,
        end: start + keeps - 1, // 最后一个item的索引
        keeps,
        total: 0,
        offsetAll: 0, // 可滚动距离
        paddingTop: 0,
        paddingBottom: 0
      })
    }
  },
  created() {
    console.log('delta', this.delta);
  },

  mounted() {
    if (this.start) {
      const start = this.getZone(this.start).start;
      this.setScrollTop(start * this.size);
    } else if (this.offset) {
      this.setScrollTop(this.offset);
    }
  },

  // 整体刷新
/*  beforeUpdate () {
    console.log('beforeUpdate');
    const delta = this.delta
    delta.keeps = this.remain + (this.bench || this.remain)

    const calcstart = this.changeProp === 'start' ? this.start : delta.start
    const zone = this.getZone(calcstart)

    // if start, size or offset change, update scroll position.
    if (this.changeProp && ['start', 'size', 'offset'].includes(this.changeProp)) {
      const scrollTop = this.changeProp === 'offset'
        ? this.offset : this.variable
          ? this.getVarOffset(zone.isLast ? delta.total : zone.start)
          : zone.isLast && (delta.total - calcstart <= this.remain)
            ? delta.total * this.size : calcstart * this.size

      this.$nextTick(this.setScrollTop.bind(this, scrollTop))
    }

    // if points out difference, force update once again.
    if (
      this.changeProp ||
      delta.end !== zone.end ||
      calcstart !== zone.start
    ) {
      this.changeProp = ''
      delta.end = zone.end
      delta.start = zone.start
      this.forceRender()
    }
  },*/

  methods: {
    onScroll() {
      console.log('onScroll');
      const delta = this.delta;
      // offset = (vsl && (vsl.$el || vsl).scrollTop) || 0
      const offset = this.$el?.scrollTop || 0;
      // console.log('offset', offset);
      delta.direction = offset > delta.scrollTop ? 'D' : 'U';
      delta.scrollTop = offset;

      if (delta.total > delta.keeps) {
        this.updateZone(offset);
      } else {
        delta.end = delta.total - 1;
      }
    },

    updateZone (offset) {
      const delta = this.delta;

      // 当前滚过了多少个item
      let overs = Math.floor(offset / this.size);

      // 如果是向上滚，滚过的item应该减少
      if (delta.direction === 'U') { // ??
        overs = overs - this.remain + 1
      }
      const zone = this.getZone(overs);
      const bench = this.bench || this.remain;

      // 经过的items超过了bench(10)，就应该渲染下一块区域了，否则说明滚动在区域内，则不更新dom
      // 向下才会是true
      const shouldRenderNextZone = Math.abs(overs - delta.start - bench) === 1
      if (
        !shouldRenderNextZone &&
        (overs - delta.start <= bench) &&
        !zone.isLast && (overs > delta.start)
      ) {
        return
      }

      // 尽量减少forceRender的调用
      if (
        shouldRenderNextZone ||
        zone.start !== delta.start ||
        zone.end !== delta.end
      ) {
        delta.end = zone.end
        delta.start = zone.start
        this.forceRender()
      }
    },

    // return the right zone info based on `start/index`.
    getZone (index) {
      let start, end
      const delta = this.delta;

      index = parseInt(index);
      index = Math.max(0, index);

      const lastStart = delta.total - delta.keeps;
      const isLast = (index >= lastStart && index <= delta.total) || (index > delta.total);

      if (isLast) {
        start = Math.max(0, lastStart)
      } else {
        start = index
      }
      end = start + delta.keeps - 1
      if (delta.total && end > delta.total) {
        end = delta.total - 1
      }

      return {
        end,
        start,
        isLast
      }
    },

    // 浏览器下一次重绘时执行,避免短时间内触发大量reflow
    forceRender () {
      window.requestAnimationFrame(() => {
        this.$forceUpdate()
      })
    },

    // set manual scroll top.
    setScrollTop (scrollTop) {
      if (this.$el) {
        this.$el.scrollTop = scrollTop;
      }
    },

    // 根据start、end决定要渲染哪些节点
    filterNodes (h) {
      const delta = this.delta;
      const slots = this.$slots.default || [];

      delta.total = slots.length;
      if (!slots.length) {
        delta.start = 0
      }
      const hasPadding = delta.total > delta.keeps;
      const allHeight = this.size * delta.total
      const paddingTop = this.size * (hasPadding ? delta.start : 0)
      let paddingBottom = this.size * (hasPadding ? delta.total - delta.keeps : 0) - paddingTop

      if (paddingBottom < this.size) {
        paddingBottom = 0
      }

      delta.paddingTop = paddingTop
      delta.paddingBottom = paddingBottom
      delta.offsetAll = allHeight - this.size * this.remain

      const renders = []
      for (let a = delta.start; a < delta.total && a <= Math.ceil(delta.end); a++) {
        renders.push(slots[a]);
      }
      return renders
    }
  },

  render (h) {
    let list = this.filterNodes(h);
    const { paddingTop, paddingBottom } = this.delta;

    const rootStyle = {
      display: 'block',
      'overflow-y': this.size >= this.remain ? 'auto' : 'initial',
      height: this.size * this.remain + 'px'
    }

    const itemWrapStyle = {
      display: 'block',
      'padding-top': paddingTop + 'px',
      'padding-bottom': paddingBottom + 'px'
    }

    // _debounce(this.onScroll.bind(this), 300)
    return (
      <div style={ rootStyle } onScroll={ this.onScroll }>
        <div role="group" style={ itemWrapStyle }>{ list }</div>
      </div>
    );
  }
}
