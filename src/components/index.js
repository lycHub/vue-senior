import Vue from 'vue';
import Notification from './gl-notice/gl-notice';
import Notice from './gl-notice';
import GlInput from './gl-input';
import GlForm from './gl-form/gl-form';
import GlFormItem from './gl-form/gl-form-item';
import Picker from './picker/picker';
import GlLazy from './gl-lazy/gl-lazy';
const comps = [Notification, GlInput, GlFormItem, GlForm, Picker, GlLazy];
comps.forEach(item => {
  Vue.component(item.name, item);
});

Vue.prototype.$notice = Notice;
