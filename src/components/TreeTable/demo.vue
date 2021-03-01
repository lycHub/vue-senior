<template>
  <div class="demo-box">
    demo-box
    <VirtualTreeTable />
  </div>
</template>

<script>
  import VirtualTreeTable from './index';
  export default {
    name: "DemoBox",
    components: { VirtualTreeTable }
  }
</script>

<style scoped lang="less">
  .demo-box {

  }
</style>
