<template>
  <div class="scroll-board">
    <div class="rows">
      <div class="row-item" v-for="(row, index) of list" :key="index">
        <div class="cell" v-for="(cell) of row" :key="cell">{{ cell }}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ScrollBoard",
  props: {
    list: {
      type: Array,
      default: () => [],
    }
  },
  data() {
    return {

    };
  },
  watch: {

  },
  methods: {}
};
</script>

<style scoped lang="less">
  .scroll-board {
    .rows {
      font-size: 18px;
      max-height: 230px;
      overflow-y: hidden;
      .row-item {
        display: flex;
        /*height: 40px;*/
        /*line-height: 40px;*/
        padding: 14px 0;
        background-color: rgb(10, 39, 50);
        text-align: center;
        &:nth-child(even) {
          background-color: rgb(0, 59, 81);
        }
        .cell {
          flex: 1;
        }
      }
    }
  }
</style>
