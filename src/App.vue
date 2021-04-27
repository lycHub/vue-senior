<template>
  <div id="app">
    <h1>{{ title }}</h1>
    <div class="test-box">
      <sortable />
    </div>
  </div>
</template>

<script>
import Sortable from './Sortable';

export default {
  name: 'App',
  components: { Sortable },
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
}
</style>
