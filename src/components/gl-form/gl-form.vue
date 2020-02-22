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
      rules: Object,
    },
    data() {
      return {
        error: '',
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
        const formItems = findComponentsDownward(this, 'glFormItem');
        console.log(formItems);
        Promise.all(formItems.filter(child => child.prop).map(child => child.validate())).then(() => {
          cb(true);
        }).catch(() => cb(false));
      },
      resetFields() {
        const formItems = findComponentsDownward(this, 'glFormItem');
        formItems.filter(child => child.prop).forEach(child => child.resetField(this.memeryModel[child.prop]));
      }
    }
  }
</script>
