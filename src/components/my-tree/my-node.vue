<template>
  <collapse-transition appear>
    <div class="my-tree-children">
      <div :class="['my-tree-node', { 'node-selected': node.selected }]">
        <Icon :class="['my-tree-arrow', { expand: node.expand }]" v-if="hasChildren" @click="handleExpand" type="ios-arrow-forward" />
        <span class="my-tree-title" @click="handleSelect">
          <tree-render v-if="trueRender" :render="trueRender" :node="node" />
          <tree-render v-else-if="vNode" :vNode="vNode.slotVNode" :node="node" />
          <template v-else>{{ node.title }}</template>
        </span>
      </div>
      <my-node
        v-if="showNode"
        v-for="item of node.children"
        :key="item.id"
        :slot-nodes="slotNodes"
        :node="item" />
    </div>
  </collapse-transition>
</template>

<script>
  import CollapseTransition from '../../../src/components/base/collapse-transition';
  import TreeRender from './render';
  export default {
    name: 'my-node',
    inject: ['myTree'],
    components: { CollapseTransition, TreeRender },
    props: {
      node: {
        type: Object,
        default () {
          return {};
        }
      },
      slotNodes: {
        type: Array,
        default: () => []
      }
    },
    computed: {
      hasChildren () {
        return this.node.children && this.node.children.length;
      },
      showNode () {
        return this.hasChildren && this.node.expand;
      },
      trueRender () {
        // console.log('myTree rr', this.myTree.render);
        return this.node.render || this.myTree.renderFunc;
      },
      vNode () {
        return this.slotNodes.find(item => item.id === this.node.id);
      }
    },
    methods: {
      handleSelect () {
        this.myTree.addSelected(this.node);
      },
      handleExpand () {
        this.myTree.handleExpand(this.node);
      }
    },
    created () {
      if (this.node.selected) {
        this.myTree.addSelected(this.node, true);
      }
    }
  }
</script>

<style scoped>

</style>
