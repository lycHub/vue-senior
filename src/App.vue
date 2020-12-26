<template>
  <div id="app">
    <h1>{{ title }}</h1>
    <div class="test-box">
      <VirtualListDemo />
    </div>
  </div>
</template>

<script>
import VirtualListDemo from './components/virtual-list/demo';
import { treeData } from './data';

export default {
  name: 'App',
  components: { VirtualListDemo },
  data() {
    return {
      title: 'Vue',
      data: treeData
    }
  },
  methods: {
    loadData (item, callback) {
      const children = this.generateBigData();
      setTimeout(() => {
        callback(children);
      }, 100);
    },
    generateBigData() {
      const result = [];
      for (let a = 1; a <= 15000; a++) {
        result.push({
          title: 'leaf 2-2-2-' + a,
          pid: '0020202',
          id: '00202020' + a,
          isLeaf: true
        })
      }
      return result;
    }
  }
}
</script>
<style lang="less" scoped>
#app {
  color: #fff;
  h1 {
    font-size: 20px;
  }
  .test-box {

  }
}
</style>
