<template>
  <div class="demo-box">
    <button @click="addList">add list</button>
    <button @click="pushList">push list</button>
    <button @click="refreshList">refresh list</button>
    <scroll-board :list="list"  ref="scrollBoard" />
  </div>
</template>

<script>
  import ScrollBoard from './index'
  import {cloneDeep} from "lodash";
  export default {
    name: "ScrollBoardDemo",
    components: { ScrollBoard },
    data() {
      return {
        list: [
          ['行1列1', '行1列2', '行1列3'],
          ['行2列1', '行2列2', '行2列3'],
          ['行3列1', '行3列2', '行3列3'],
          ['行4列1', '行4列2', '行4列3'],
          ['行5列1', '行5列2', '行5列3'],
          ['行6列1', '行6列2', '行6列3'],
          ['行7列1', '行7列2', '行7列3'],
          ['行8列1', '行8列2', '行8列3'],
          ['行9列1', '行9列2', '行9列3'],
          ['行10列1', '行10列2', '行10列3']
        ]
      }
    },
    methods: {
      addList() {
        this.$refs['scrollBoard'].updateRows([
          ['行11列1', '行11列2', '行11列3'],
          ['行12列1', '行12列2', '行12列3'],
          ['行13列1', '行13列2', '行13列3']
        ])
      },
      pushList() {
        this.list.push(
          ['行11列1', '行11列2', '行11列3'],
          ['行12列1', '行12列2', '行12列3'],
          ['行13列1', '行13列2', '行13列3']
        );
      },
      refreshList() {
        this.list = cloneDeep(this.list);
      }
    }
  }
</script>

<style scoped>

</style>
