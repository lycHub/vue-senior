<template>
  <div class="ka">
    <h3>这是B</h3>
    <ul>
      <li v-for="item of tabs" :key="item" @click="currentTab = item">{{ item }}</li>
    </ul>
    <p class="content">当前：{{ currentTab }}</p>
  </div>
</template>

<script>
  export default {
    name: 'B',
    data () {
      return {
        tabs: ['歌手', '歌单'],
        currentTab: '歌手'
      }
    }
  }
</script>

<style scoped lang="less">
  .ka ul {
    display: flex;
    text-align: center;
    li {
      padding: 20px;
      cursor: pointer;
    }
  }
</style>
