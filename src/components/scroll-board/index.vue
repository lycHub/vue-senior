<template>
  <div class="scroll-board">
    <div class="rows">
      <div class="row-item" v-for="(row) of rows" :key="row.key" :style="rowStyle(row)">
        <div class="cell" v-for="(cell) of row.cells" :key="cell">{{ cell }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import {cloneDeep} from "lodash";
const waitTime = 2000;
const transitTime = 300;
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
      rows: [],
      currentIndex: 0,
      animationHandler: null,
      currentRow: null
    };
  },
  watch: {
    list(newVal) {
      this.setRows(newVal);
    }
  },
  methods: {
    animate() {
      const animation = async () => {
        this.currentRow = this.rows[0];
        await new Promise(resolve => setTimeout(resolve, transitTime));
        this.rows.splice(0, 1);
        this.rows.push(this.currentRow);
      }
      this.animationHandler = setInterval(animation, waitTime);
    },
    rowStyle(row) {
      const style = {
        height: 'auto',
        padding: '14px 0',
        backgroundColor: row.rowIndex % 2 === 0 ? '#0a2732' : '#003b51'
      }
      if (this.currentRow?.key === row.key) {
        style.padding = 0;
        style.height = 0;
      }
      return style;
    },
    setRows(list) {
      this.reset();
      if (list.length) {
        this.rows = cloneDeep(list).map((cells, index) => {
          return {
            key: cells.toString(),
            cells,
            rowIndex: index
          }
        });
        this.animate();
      } else {
        this.rows = [];
      }
    },
    updateRows(rows) {
      const currentLen = this.rows.length;
      const mapRows = rows.map((cells, index) => {
        return {
          key: cells.toString(),
          cells,
          rowIndex: currentLen + index
        }
      });
      const rowIndex = this.currentRow?.rowIndex ?? -1;
      const spliceIndex = rowIndex >= 0 ? currentLen - rowIndex - 1 : currentLen;
      this.rows.splice(spliceIndex, 0, ...mapRows);
    },
    reset() {
      this.currentRow = null;
      this.stopAnimation();
    },
    stopAnimation () {
      if (this.animationHandler) {
        clearInterval(this.animationHandler);
      }
    },
  },
  mounted() {
    this.setRows(this.list);
  }
};
</script>

<style scoped lang="less">
  .scroll-board {
    .rows {
      font-size: 18px;
      max-height: 230px;
      /*overflow-y: hidden;*/
      .row-item {
        display: flex;
        padding: 14px 0;
        background-color: rgb(10, 39, 50);
        text-align: center;
        transition: all .3s;
        overflow-y: hidden;
        .cell {
          flex: 1;
        }
      }
    }
  }
</style>
