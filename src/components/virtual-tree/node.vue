<template>
  <div
      class="virtual-tree-node"
      :style="{ paddingLeft: node.level * 18 + 'px' }"
  >
    <i :class="['virtual-tree-arrow', { expand: node.expand }]" v-if="!node.isLeaf" @click="$emit('toggle-expand')">&gt;</i>
    <span class="virtual-tree-title">{{ node.title }}</span>
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
}
</script>

<style scoped lang="less">

</style>
