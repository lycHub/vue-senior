import Vue from 'vue';
import Notification from './notice/notice';
import Notice from './notice';
import GlInput from './gl-input';
import GlForm from './gl-form/gl-form';
import GlFormItem from './gl-form/gl-form-item';
const comps = [Notification, GlInput, GlFormItem, GlForm];
comps.forEach(item => {
  Vue.component(item.name, item);
});

Vue.prototype.$notice = Notice;