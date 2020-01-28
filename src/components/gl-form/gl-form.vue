<template>
  <div class="gl-form">
    <slot></slot>
  </div>
</template>

<script>
  import {findComponentsDownward} from "../../utils/assits";

  export default {
    name: "glForm",
    provide() {
      return {
        form: this
      }
    },
    props: {
      model: Object,
      rules: Object
    },
    data() {
      return {
        memeryModel: null
      }
    },
    watch: {
      model: {
        handler(newVal) {
          if (!this.memeryModel) {
            this.memeryModel = { ...newVal };
          }
        },
        immediate: true
      }
    },
    methods: {
      validate(cb) {
        const children = findComponentsDownward(this, 'glFormItem');
        Promise.all(children.filter(child => child.prop).map(child => child.validate()))
          .then(() => cb(true)).catch(() => cb(false));
      },
      resetFileds() {
        const children = findComponentsDownward(this, 'glFormItem');
        children.filter(child => child.prop).forEach(child => child.resetFiled(this.memeryModel[child.prop]));
      }
    }
  }
</script>