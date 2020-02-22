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
  import Schema from 'async-validator';
  export default {
    name: "glFormItem",
    inject: ['form'],
    props: {
      label: String,
      prop: String
    },
    data() {
      return {
        error: '',
        formControl: null,
      }
    },
    methods: {
      validate() {
        const value = this.form.model[this.prop];
        const rules = this.form.rules[this.prop];
        const schema = new Schema({ [this.prop]: rules });
        return schema.validate({ [this.prop]: value }).then(() => {
          this.error = '';
          return true;
        }).catch(({ errors }) => {
          console.log(errors);
          this.error = errors[0].message
          return Promise.reject(errors);
        });
      },
      resetField(value) {
        if (this.formControl) {
          this.formControl.$emit('reset', value);
        }
        this.error = '';
      },
      setForControl(child) {
        this.formControl = child;
      }
    },
    mounted() {
      this.$on('onValidate', () => {
        this.validate();
      })
    }
  }
</script>
