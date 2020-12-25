<template>
  <div class="virtual-tree">
    <div class="virtual-tree-wrap">
      <virtual-list :size="32" :remain="10">
        <template v-for="(item, index) of visibleList">
          <div
            :key="item.id"
            class="virtual-tree-node"
            :style="{ paddingLeft: item.level * 18 + 'px' }">
            <i :class="['virtual-tree-arrow', { expand: item.expand }]" v-if="!item.isLeaf" @click="toggleExpand(item, index)">&gt;</i>
            <span class="virtual-tree-title">{{ item.title }}</span>
          </div>
        </template>
      </virtual-list>
    </div>
  </div>
</template>

<script>
import VirtualList from 'vue-virtual-scroll-list'
export default {
  name: "VirtualTree",
  components: { VirtualList },
  props: {
    source: {
      type: Array,
      default: () => []
    },
    loadData: Function
  },
  data() {
    return {
      flatList: [],
      visibleList: []
    }
  },
  watch: {
    source (newVal) {
      this.flatList = this.flattenTree();
      // console.log('flatList', this.flatList);
      this.refreshVisibleList();
    }
  },
  methods: {
    toggleExpand (item, index) {
      console.log('toggleExpand', item);
      item.expand = !item.expand;
      if (item.expand) {
        if (item.children.length) {
          this.expandNode(item);
          this.refreshVisibleList();
        } else {
          console.log('异步加载');
          this.loadData(item, children => {
            // console.log('cb', children);
            if (children.length) {
              item.children = children;
              this.expandNode(item, true);
              this.$nextTick(() => {
                this.refreshVisibleList();
              })
            }
          });
        }
      } else {
        this.collapseNode(item);
        this.refreshVisibleList();
      }
    },
    expandNode (node, setFlatList = false) {
      node.children.forEach(item => {
        item.visible = true;
        item.level = item.level || node.level + 1;
        item.expand = item.expand || false;
        item.isLeaf = item.isLeaf || false;
        // item.children = item.children || [];
      });
      if (setFlatList) {
        const targetIndex = this.flatList.findIndex(item => item.id === node.id);
        this.flatList.splice(targetIndex + 1, 0, ...node.children);
        // console.log('flatlist', this.flatList);
        // console.log('node', node);
        // this.flatList.splice(index + 1, 0, ...node.children);
        // this.flatList = this.flattenTree();
        // this.refreshVisibleList();
      }
    },
    collapseNode (node) {
      if (node.children.length) {
        node.children.forEach(item => {
          item.visible = false;
          if (item.expand) {
            item.expand = false;
            this.collapseNode(item);
          }
        });
      }
    },
    refreshVisibleList () {
      this.visibleList = this.flatList.filter(item => item.visible);
      this.$forceUpdate();
    },
    flattenTree() {
      const flatten = function(list, level = 0, parent = null) {
        const arr = [];
        list.forEach(item => {
          item.level = level;
          item.expand = item.expand || false;
          item.isLeaf = item.isLeaf || false;
          item.children = item.children || [];
          if (parent) {
            item.visible = (parent.children.length && parent.expand);
          } else {
            item.visible = true;
          }
          // item.parent = parent;
          arr.push(item);
          if (item['children']) {
            arr.push(...flatten(item['children'], level + 1, item));
          }
        });
        return arr;
      };
      if (this.source.length) {
        return flatten(this.source);
      }
      return [];
    }
  }
}
</script>

<style scoped lang="less">
.virtual-tree {

}
</style>
