<template>
  <div id="app">
    <h1>{{ title }}</h1>
    <div class="test-box">
      <picker-demo />
    </div>
  </div>
</template>

<script>
import PickerDemo from './components/picker/demo';

export default {
  name: 'App',
  components: { PickerDemo },
  data() {
    return {
      title: 'Vue',
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
