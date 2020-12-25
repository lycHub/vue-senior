<template>
  <div
    class="virtual-tree-node"
    :style="{ paddingLeft: node.level * 18 + 'px' }">
    <i :class="['virtual-tree-arrow', { expand: node.expand }]" v-if="!node.isLeaf" @click="$emit('toggle-expand')">&gt;</i>
    <span class="virtual-tree-title">{{ node.title }}--{{ node.expand }}</span>
  </div>
</template>

<script>
export default {
  name: "VirtualTreeNode",
  props: {
    node: {
      type: Object,
      default () {
        return {};
      }
    }
  },
  watch: {
    'node.expand' (newVal) {
      console.log('wat expand', newVal);
    }
  }
}
</script>

<style scoped lang="less">

</style>
