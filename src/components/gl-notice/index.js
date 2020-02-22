import Vue from 'vue';
import GlNotice from './gl-notice';
export const normalGap = 14;
export default {
  data: {
    id: 0,
    vms: []
  },
  info(options) {
    this.show(options);
  },
  success(options) {
    this.show(options, 'success');
  },
  warning(options) {
    this.show(options, 'warning');
  },
  error(options) {
    this.show(options, 'error');
  },
  show(options, type = 'info') {
    if (Vue.prototype.$isServer) return;
    const instance = new Vue({
      extends: GlNotice,
      propsData: options,
      data: { type }
    });
    instance.vm = instance.$mount();
    document.documentElement.appendChild(instance.vm.$el);
    
    instance.vm.id = `notice_${this.data.id++}`;
    let offsetTop = instance.vm.offsetTop;
    console.log('offsetTop', offsetTop);
    this.data.vms.forEach(item => {
      offsetTop += item.$el.offsetHeight + normalGap;
    });
    instance.vm.offsetTop = offsetTop;
    this.data.vms.push(instance.vm);
    instance.vm.visible = true;
    instance.vm.$on('close', () => instance.vm.visible = false);
    instance.vm.$on('closed', ins => this.remove(ins));
  },
  remove(ins) {
    if (!ins || !this.data.vms.length) return;
    const removeIndex = this.data.vms.findIndex(item => item.id === ins.id);
    if (removeIndex > -1) {
      this.data.vms.splice(removeIndex, 1);
      const removeHeight = ins.height;
      for (let a = removeIndex; a < this.data.vms.length; a++) {
        const vm = this.data.vms[a];
        vm.offsetTop -= (removeHeight + normalGap);
      }
      document.documentElement.removeChild(ins.$el);
    }
    if (ins.onClosed) {
      ins.onClosed();
    }
    ins.$destroy();
  }
}
