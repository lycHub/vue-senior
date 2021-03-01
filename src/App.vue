<template>
  <div id="app">
    <h1>{{ title }}</h1>
    <div class="test-box">
      <demo-box />
    </div>
  </div>
</template>

<script>
import DemoBox from './components/TreeTable/demo';

export default {
  name: 'App',
  components: { DemoBox },
  data() {
    return {
      title: 'Vue'
    }
  }
}
</script>
<style lang="less" scoped>
#app {
  color: #fff;
  h1 {
    font-size: 20px;
  }
  .test-box {
    padding: 20px;
    max-height: 300px;
    overflow-y: auto;
  }
}
</style>
