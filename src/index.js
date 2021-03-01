import Vue from 'vue';
import App from './App.vue';
import AppVtree from './AppVTree.vue';
import ViewUI from 'view-design';
import {setViewport} from "./viewport";
Vue.config.productionTip = false;
import 'view-design/dist/styles/iview.css';
import './assets/styles/index.less';


Vue.use(ViewUI);

setViewport();
import './components'
import './directives'
new Vue({
  el: '#app',
  render: h => h(App)
});
