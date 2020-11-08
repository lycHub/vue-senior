<template>
  <div id="app">
    <h1>{{ title }}</h1>
    <div class="test-box">
      <p>currentTab: {{ currentTab }}</p>
      <tabs v-model="currentTab">
        <tab-pane v-for="item of 33" :key="item" :name="'tab' + item">
          <div class="card">
            <p>title {{ item }}</p>
            <b>des {{ item }}</b>
          </div>
        </tab-pane>
      </tabs>
    </div>
  </div>
</template>

<script>
import Tabs from "./components/tabs/tabs.js";
import TabPane from "./components/tabs/tab-pane.js";
export default {
  name: "App",
  components: { Tabs, TabPane },
  data() {
    return {
      title: "Senior Vue",
      currentTab: "tab1",
    };
  },
  methods: {},
  created() {},
};
</script>
<style lang="less" scoped>
#app {
  color: #fff;
  h1 {
    font-size: 20px;
  }
  .test-box {
    padding: 20px 0;
  }
}
</style>
