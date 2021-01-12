import './index.less';

export default {
  name: "tabs",
  props: {
    value: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      tabPanes: [],
      current: this.value,
      tabSize: 0
    };
  },
  watch: {
    value(newVal) {
      console.log('value :>> ', newVal);
      this.current = newVal;
    }
  },
  computed: {
    tabNavs() {
      return this.tabPanes.map((item, index) => {
        const cls = item.name === this.current ? 'tabs-nav active' : 'tabs-nav';
        return <div class={ cls } ref="nav" refInFor={ true } onClick={ this.tabClick.bind(this, index) }>{ item.name }</div>;
      });
    },
    linkBar() {
      const width = this.tabSize / 2;
      const baseLeft = width / 2;
      const style = {
        width: width + 'px',
        left: (baseLeft + (this.currentIndex * this.tabSize)) + 'px'
      }
      return <div class="tabs-ink-bar" style={ style }></div>;
    },
    tabContents() {
      return this.tabPanes.map(item => {
        return <div class="tabs-tabpane">{ item.$slots.default }</div>;
      });
    },
    contentStyle() {
      return `transform: translateX(-${this.currentIndex * 100 }%)`;
    },
    currentIndex() {
      return Math.max(this.tabPanes.findIndex(item => item.name === this.current), 0);
    }
  },
  methods: {
    tabClick(index) {
      console.log('tabClick :>> ', index);
      const { name } = this.tabPanes[index];
      if (name !== this.current) {
        this.change(name);
      }
    },
    change(value) {
      this.$emit("input", value);
      this.$emit("change", value);
    },
  },
  mounted() {
    this.tabPanes = this.$slots.default
      .filter((item) => item.componentInstance)
      .map((item) => item.componentInstance);
    if (this.tabPanes.length && !this.current) {
      this.change(this.tabPanes[0].name);
    }
    this.$nextTick(() => {
      this.tabSize = this.$refs['nav'][0].clientWidth;
    });
  },
  render(h) {
    return (
      <div class="tabs">
        <div class="tabs-nav-wrap">
          <div class="tabs-nav-scroll">
            { this.tabNavs }
            { this.linkBar }
          </div>
        </div>
        <div class="tabs-content" style={ this.contentStyle }>
          { this.tabContents }
        </div>
        { this.$slots.default }
      </div>
    );
  }
};