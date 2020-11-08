<template>
  <div class="tabs">
    <div class="tabs-nav-wrap">
      <div class="tabs-nav-scroll">
        <div class="tabs-nav" v-for="item of tabPanes" :key="item.name">
          {{ item.name }}
        </div>
        <div class="tabs-ink-bar"></div>
      </div>
    </div>
    <div class="tabs-content">
      <div class="tabs-tabpane" v-for="item of tabPanes" :key="item.name">
        {{ item.$slots.default }}
      </div>
    </div>
    <slot />
  </div>
</template>

<script>
export default {
  name: "tabs",
  data() {
    return {
      tabPanes: [],
    };
  },
  mounted() {
    this.tabPanes = this.$slots.default
      .filter((item) => item.componentInstance)
      .map((item) => item.componentInstance);
    console.log("tabPanes", this.tabPanes);
  },
};
</script>

<style scoped lang="less">
.tabs {
  .tabs-nav-wrap {
    overflow: hidden;
    border-bottom: 1px solid #e8e8e8;
    margin-bottom: 16px;
    .tabs-nav-scroll {
      position: relative;
      .tabs-nav {
        display: inline-block;
        box-sizing: border-box;
        height: 100%;
        // margin-right: 32px;
        padding: 12px 16px;
        transition: color 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
        &.active {
          color: #096dd9;
          font-weight: bold;
        }
      }
      .tabs-ink-bar {
        position: absolute;
        bottom: 0;
        left: 16px;
        width: 32px;
        height: 2px;
        background-color: #1890ff;
      }
    }
  }

  .tabs-content {
    display: flex;
    .tabs-tabpane {
      width: 100%;
      flex-shrink: 0;
    }
  }
}
</style>
