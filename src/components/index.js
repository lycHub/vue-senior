import Vue from 'vue';
import GlInput from './gl-input';
import GlForm from './gl-form/gl-form';
import GlFormItem from './gl-form/gl-form-item';

const comps = [GlInput, GlFormItem, GlForm];
for (const item of comps) {
  Vue.component(item.name, item);
}
