let io = null;
let firstChange = true;
export default {
  name: 'intersect',
  directive: {
    bind (el, { value, modifiers }) {
      io = new IntersectionObserver(entries => {
        // entries是被监测节点的集合
        // console.log('变了' );
        if (firstChange && modifiers.quiet) {
          firstChange = false;
          return;
        }
        value && value({
          entry: entries[0],
          isVisible: entries[0].intersectionRatio > 0
        });
      });

      // 监测指定节点
      io.observe(el);
      // this.io.observe(this.$refs['box4']);   可监测多个
    },
    unbind() {
      io && io.disconnect();
    }
  }
}