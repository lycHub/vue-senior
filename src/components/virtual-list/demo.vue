<template>
  <div class="virtual-list-demo">
    <div class="list-wrap">
      <Button @click="refresh('re')">refresh</Button>
      <Button @click="add">add</Button>
      <virtual-list :size="40" :remain="10">
        <div class="item" v-for="item of list" :key="item">{{ item }}</div>
      </virtual-list>
    </div>
  </div>
</template>

<script>
  import VirtualList from './index';
  export default {
    name: "VirtualListDemo",
    components: { VirtualList },
    data() {
      return {
        title: 'Vue',
        list: []
      }
    },
    methods: {
      loadData (item, callback) {
        const children = this.generateBigData();
        setTimeout(() => {
          callback(children);
        }, 100);
      },
      generateBigData(prefix = 'list') {
        const result = [];
        for (let a = 0; a < 5000; a++) {
          result.push(prefix + '--' + a)
        }
        return result;
      },
      addBigData(prefix = 'list') {
        const result = [];
        for (let a = 0; a < 10; a++) {
          result.push(prefix + ' add--' + a)
        }
        return result;
      },
      refresh(prefix) {
        this.list = this.generateBigData(prefix);
      },
      add() {
        this.list.splice(37, 0, ...this.addBigData());
      }
    },
    created() {
      this.list = this.generateBigData();
    }
  }
</script>

<style scoped lang="less">
  .virtual-list-demo .list-wrap {
    width: 500px;
    margin: 20px auto;
    border: 1px solid darkred;
    .item {
      height: 40px;
      line-height: 40px;
      text-align: center;
      border-bottom: 1px solid #d3d3d3;
      &:last-child {
        border-bottom: none;
      }
    }
  }
</style>
