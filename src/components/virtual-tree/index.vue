<template>
  <div class="virtual-tree">
    <virtual-list class="virtual-tree-wrap" :size="35" :remain="10" ref="vl">
      <div
        v-for="item of visibleList"
        :key="item.id"
        class="virtual-tree-node"
        :style="{ paddingLeft: item.level * 18 + 'px' }">
<!--       v-if="!item.isLeaf && pending"-->
        <div :class="['virtual-tree-arrow', { expand: item.expand }]">
          <Icon v-if="!item.isLeaf && item.pending" class="icon loading" type="ios-loading" />
          <Icon class="icon" type="ios-arrow-forward" v-if="!item.isLeaf && !item.pending" @click="toggleExpand(item)" />
        </div>
        <Checkbox class="virtual-tree-check-box" :value="item.checked" @on-change="checkChange($event, item)">
          <span class="virtual-tree-title">{{ item.name }}</span>
        </Checkbox>
      </div>
    </virtual-list>
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
        visibleList: [],
        pending: false
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
      getCheckedNodes () {
        return this.flatList.filter(item => item.checked);
      },
      checkChange (checked, node) {
        this.updateDownwards(checked, node);
        this.updateUpwards(checked, node);
        this.refreshVisibleList();
        // console.log('visibleList', this.visibleList);
      },
      updateUpwards (checked, node) {
        node.checked = checked;
        console.log(+node.pid);
        if (+node.pid) { // 说明是子节点
          const parentNode = this.flatList.find(item => item.id == node.pid);
          console.log('parentNode', parentNode);
          const parentChecked = !parentNode.children.some(child => !child.checked);
          if (parentChecked !== parentNode.checked) { // 父节点变了的话，就还要继续向上更新
            // parentNode.checked = parentChecked;
            this.updateUpwards(parentChecked, parentNode);
          }
        }
      },

      updateDownwards (checked, node) {
        node.checked = checked;
        const update = (children) => {
          if (children.length) {
            children.forEach(child => {
              child.checked = checked;
              if (child.children.length) {
                update(child.children);
              }
            });
          }
        }
        update(node.children);
      },
      toggleExpand (item) {
        // console.log('toggleExpand', item);
        if (this.pending) return;
        item.expand = !item.expand;
        if (item.expand) {
          if (item.children.length) {
            this.expandNode(item);
            this.refreshVisibleList();
          } else {
            console.log('异步加载');
            item.pending = true;
            this.pending = true;
            this.$forceUpdate();
            this.loadData(item, children => {
              item.pending = false;
              this.pending = false;
              if (children.length) {
                item.children = children;
                this.expandNode(item, true);
              }
              this.refreshVisibleList();
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
          item.pending = false;
          item.level = item.level || node.level + 1;
          item.expand = item.expand || false;
          item.checked = item.checked || node.checked;
          item.children = item.children || [];
        });
        if (setFlatList) {
          const targetIndex = this.flatList.findIndex(item => item.id === node.id);
          this.flatList.splice(targetIndex + 1, 0, ...node.children);
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
        this.$refs['vl'].forceRender();
        // console.log('visibleList', this.visibleList);
        // this.$nextTick(() => {
        //   this.$forceUpdate();
        // })
      },
      flattenTree() {
        const flatten = function(list, level = 0, parent = null) {
          const arr = [];
          list.forEach(item => {
            item.level = level;
            item.pending = false;
            item.expand = item.expand || false;
            item.checked = item.checked || parent?.checked || false;
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
