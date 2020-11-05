<template>
  <div id="app">
    <h1>{{ title }}</h1>
  </div>
</template>

<script>
  export default {
    name: 'App',
    data() {
      return {
        title: 'Senior Vue'
      }
    },
    methods: {

    }
  }
</script>
<style lang="less" scoped>
  #app {
    h1 {
      font-size: 20px;
    }
  }
</style>
