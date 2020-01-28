<template>
  <div class="gl-form-item">
    <slot name="label">
      <label class="gl-form-label" v-show="label">{{label}}</label>
    </slot>
    <div class="gl-form-control-wrap">
      <div class="gl-form-control">
        <slot></slot>
      </div>
      <p class="gl-form-error" v-show="error">{{error}}</p>
    </div>
  </div>
</template>

<script>
  import schema from 'async-validator';
  import {findComponentDownward} from "../../utils/assits";
  export default {
    name: "glFormItem",
    inject: ['form'],
    props: {
      label: {
        type: String,
        default: ''
      },
      prop: {
        type: String,
        default: ''
      }
    },
    data() {
      return {
        error: '',
        formControl: null
      }
    },
    methods: {
      setFormControl(formControl) {
        this.formControl = formControl;
      },
      resetFiled(value) {
        if (this.formControl) {
          this.formControl.$emit('reset', value);
          this.error = '';
        }
      },
      validate() {
        const value = this.form.model[this.prop];
        const rules = this.form.rules[this.prop];
        const descriptor = { [this.prop]: rules };
        const validator = new schema(descriptor);
        return validator.validate({ [this.prop]: value }).then(() => {
          this.error = '';
          return true;
        }).catch(({ errors }) => {
          this.error = errors[0].message;
          return Promise.reject(errors);
        });
      }
    },
    mounted() {
      this.$on('onValidtate', () => {
        this.validate();
      });
    }
  }
</script>