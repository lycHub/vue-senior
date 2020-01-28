import Vue from 'vue';
import Notice from './notice';

export default {
  data: {
    id: 0,
    vms: []
  },
  show(options, type = 'info') {
    const instance = new Vue({
      extends: Notice,
      propsData: options,
      data: { type }
    });
    instance.vm = instance.$mount();
    document.documentElement.appendChild(instance.vm.$el);
    instance.vm.visible = true;
    
    instance.vm.id = `notice_${this.data.id++}`;
    let offsetTop = instance.vm.offsetTop;
    this.data.vms.forEach(item => {
      offsetTop += item.$el.offsetHeight + 14;
    });
    instance.vm.offsetTop = offsetTop;
    this.data.vms.push(instance.vm);
    instance.vm.$on('close', () => instance.vm.visible = false);
    instance.vm.$on('closed', ins => this.remove(ins));
  },
  remove(ins) {
    if (!ins) return;
    if (this.data.vms.length <= 1) {
      this.data.vms = [];
    } else {
      const removeIndex = this.data.vms.findIndex(item => item.id === ins.id);
      if (removeIndex > -1) {
        this.data.vms.splice(removeIndex, 1);
        const removeHeight = ins.height
        for (let a = removeIndex; a < this.data.vms.length; a++) {
          const vm = this.data.vms[a];
          vm.offsetTop -= (removeHeight + 14);
        }
      }
    }
    document.documentElement.removeChild(ins.$el);
    if (ins.onClosed) {
      ins.onClosed();
    }
    ins.$destroy();
  },
  info(options) {
    this.show(options);
  },
  warning(options) {
    this.show(options, 'warning');
  },
  error(options) {
    this.show(options, 'error');
  },
  success(options) {
    this.show(options, 'success');
  }
}

