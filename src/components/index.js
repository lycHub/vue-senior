import Vue from 'vue';
import GlInput from './gl-input';
import GlForm from './gl-form/gl-form';
import GlFormItem from './gl-form/gl-form-item';
import GlNotification from './gl-notice/gl-notice';
import GlNotice from './gl-notice';

const comps = [GlInput, GlFormItem, GlForm, GlNotification];
for (const item of comps) {
  Vue.component(item.name, item);
}
Vue.prototype.$Notice = GlNotice;
