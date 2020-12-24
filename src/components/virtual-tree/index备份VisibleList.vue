<template>
  <div class="virtual-tree">
    <div class="virtual-tree-wrap">
<!--   循环node   -->
      <div
          class="virtual-tree-node"
          v-for="(item, index) of visibleList"
          :key="item.id"
          :style="{ paddingLeft: item.level * 18 + 'px' }"
      >
        <i :class="['virtual-tree-arrow', { expand: item.expand }]" v-if="!item.isLeaf" @click="toggleExpand(item, index)">&gt;</i>
        <span class="virtual-tree-title">{{ item.title }}--{{ item.level }}</span>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "VirtualTree",
    props: {
      source: {
        type: Array,
        default: () => []
      }
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
        this.visibleList = this.getVisibleList();
        // console.log('flatList', this.flatList);
        console.log('visibleList', this.visibleList);
      }
    },
    methods: {
      toggleExpand (item, index) {
        console.log('toggleExpand', item, index);
        item.expand = !item.expand;
        if (item.expand) {
          if (item.children.length) {
            this.expandNode(item, index);
          } else {
            alert('异步加载');
          }
        } else {
          //
        }
      },
      expandNode (node, index) {
        const children = node.children.map(item => {
          item.visible = status;
          item.level = item.level || node.level + 1;
          item.expand = item.expand || false;
          item.isLeaf = item.isLeaf || false;
          item.children = item.children || [];
          return item;
        });
        this.visibleList.splice(index + 1, 0, ...children);
      },
      getVisibleList () {
        return this.flatList.filter(item => item.visible);
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
