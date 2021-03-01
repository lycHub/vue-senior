<template>
  <div class="list-box">
    <div class="actions">
      <Button @click="showBox = !showBox">toggle box</Button> |
      <Button @click="genarateBigData(100)">refresh</Button> |
      <Button @click="addData(200)">add items</Button> |
      <Button @click="subData(100)">sub items</Button> |
      <Button @click="list = []">clear</Button>
    </div>
    <div class="scroll-box" v-if="showBox">
      <div class="list">
        <!--<virtual-list
          :list="list"
          :size="42"
          :remain="8"
          v-slot="{ item, index }">
          <div class="item">{{ item }}-{{ index }}</div>
        </virtual-list>-->

        <virtual-list
          :list="list"
          :size="42"
          :remain="8"
          custom-for-of
          @range="rangeChange">
          <div class="table">
            <div class="item" v-for="(item, index) of visibleList" :key="item">{{ item }}-{{ range.start + index }}</div>
          </div>
        </virtual-list>
      </div>
    </div>
  </div>
</template>

<script>
import VirtualList from './VirtualList.vue';
export default {
  name: 'ListDemo',
  components: { VirtualList },
  data () {
    return {
      showBox: true,
      list: [],
      visibleList: [],
      range: { start: 0, end: 0 }
    }
  },
  methods: {
    rangeChange (range) {
      this.range = range;
      this.visibleList = this.filterNodes();
    },
    filterNodes (range) {
      if (this.list.length) {
        const nodes = [];
        for (let a = this.range.start; a <= this.range.end; a++) {
          nodes.push(this.list[a]);
        }
        return nodes;
      }
      return [];
    },
    genarateBigData (count = 200) {
      this.list = [];
      for (let a = 0; a < count; a++) {
        this.list.push('item' + a);
      }
    },
    addData (count = 100) {
      const len = this.list.length;
      for (let a = 0; a < count; a++) {
        this.list.push('item' + (len + a));
      }
      this.list = this.list.slice();
    },
    subData (count = 20) {
      this.list.splice(0, count);
      this.list = this.list.slice();
    }
  },
  created () {
    this.genarateBigData();
  }
}
</script>

<style scoped>
  .list-box {
    width: 800px;
    margin: 0 auto;
  }
  .demo-box .actions {
    margin-bottom: 12px;
  }
  .scroll-box {
    /*max-height: 300px;*/
    /*overflow-y: auto;*/
  }
  .scroll-box .list .item {
    padding: 10px 20px;
    background-color: #666;
    color: #fff;
    border-bottom: 1px solid #fff;
  }
  .scroll-box .list .item:hover {
    background-color: #999;
  }
</style>
