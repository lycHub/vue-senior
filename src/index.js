import Vue from 'vue';
import App from './App.vue';
import AppVtree from './AppVTree.vue';
Vue.config.productionTip = false;
import './assets/styles/index.less';
// import 'amfe-flexible';
import {setViewport} from "./viewport";
setViewport();
import './components'
import './directives'
new Vue({
  el: '#app',
  render: h => h(AppVtree)
});
