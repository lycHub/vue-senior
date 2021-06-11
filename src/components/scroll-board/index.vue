<template>
  <div class="scroll-board">
    <transition-group
      name="list"
      tag="div"
      class="rows"
      @after-leave="afterLeave"
      @after-enter="afterEnter"
    >
      <div class="row-item" v-for="(row) of rows" :key="row.toString()">
        <div class="cell" v-for="(cell) of row" :key="cell">{{ cell }}</div>
      </div>
    </transition-group>
  </div>
</template>

<script>
import {cloneDeep} from "lodash";

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
      rows: cloneDeep(this.list),
      currentIndex: 0,
      timer: 0,
      currentRow: null
    };
  },
  watch: {
    list(newVal) {
      this.rows = cloneDeep(newVal);
    }
  },
  methods: {
    animate() {
      this.currentRow = this.rows.splice(0, 1)[0];
    },
    afterLeave(el) {
      this.rows.push(this.currentRow);
    },
    afterEnter(el) {
      this.animate();
    },
  },
  mounted() {
    if (this.rows.length) {
      this.animate();
    }
  }
};
</script>

<style scoped lang="less">
  .scroll-board {
    .rows {
      font-size: 18px;
      max-height: 200px;
      /*overflow-y: hidden;*/
      .row-item {
        display: flex;
        height: 40px;
        line-height: 40px;
        /*padding: 14px 0;*/
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

  .list-enter-active, .list-leave-active {
    /*overflow: hidden;*/
    transition: all 1s;
  }
  .list-enter, .list-leave-to {
    opacity: 0;
  }

  .list-enter-to, .list-leave {
    /*height: 40px;*/
    opacity: 1;
  }
</style>
