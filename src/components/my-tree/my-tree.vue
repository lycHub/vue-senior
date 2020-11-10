<template>
  <div class="my-tree">
    <my-node
      v-for="item of list"
      :key="item.id"
      :node="item"
      :slot-nodes="slotNodes"
    />
    <p v-if="!source.length">无数据</p>
    <slot v-if="false" v-for="item of slotNodes" :name="item.slot"></slot>
  </div>
</template>

<script>
  import MyNode from './my-node';
  export default {
    name: 'my-tree',
    components: { MyNode },
    provide () {
      return { myTree: this };
    },
    props: {
      source: {
        type: Array,
        default: () => []
      },
      renderFunc: {
        type: Function
      }
    },
    data () {
      return {
        list: this.source,
        flatList: [],
        selection: []
      }
    },
    computed: {
      slotNodes () {
        return this.flatList.filter(item => item.slot).map(item => {
          console.log(item.slot);
          return {
            ...item,
            slotVNode: this.$slots[item.slot][0]
          }
        });
      }
    },
    watch: {
      source (newVal) {
        this.list = newVal;
      }
    },
    methods: {
      addSelected (node, init = false) {
        if (init) {
          this.selection[0] = node;
        } else {
          this.handleSelect(node);
        }
      },
      handleSelect (node) {
        // const target = this.flatList.find(item => item.id === node.id);
        if (node.selected) {
          this.$set(node, 'selected', false);
          this.selection = [];
        } else { // 切换选中
          if (this.selection[0]) {
            this.$set(this.selection[0], 'selected', false);
          }
          this.$set(node, 'selected', true);
          this.selection = [node];
        }
        this.$emit('select', this.selection);
      },
      handleExpand (node) {
        this.$set(node, 'expand', !node.expand);
        this.$emit('expand-change', node);
      },
      flatTree () {
        const flatTree = [];
        function flattenChildren(list) {
          for (const item of list) {
            flatTree.push(item);
            if (item.children && item.children.length) {
              flattenChildren(item.children);
            }
          }
        }
        if (this.list.length) {
          flattenChildren(this.list);
        }
        return flatTree;
      },
    },
    created() {
      if (this.list) {
        this.flatList = this.flatTree();
        // console.log('flatList', this.flatList);
      }
    },
    mounted() {
      setTimeout(() => {
        // console.log('slots', this.$slots['title0010102']);
      }, 1000);
    }
  }
</script>
