<template>
  <div class="gl-input-wrap">
    <input
            :type="type"
            @input="onInput"
            v-bind="$attrs"
            :value="currentValue"
            :class="classes" />
  </div>
</template>

<script>
  import {findComponentUpward, oneOf} from "../utils/assits";

  export default {
    name: "glInput",
    inheritAttrs: false,
    props: {
      value: {
        type: [String, Number],
        default: ''
      },
      type: {
        validator (value) {
          return oneOf(value, ['text', 'textarea', 'password', 'url', 'email', 'date', 'time', 'number', 'tel']);
        },
        default: 'text'
      },
    },
    data() {
      return {
        currentValue: this.value,
      }
    },
    computed: {
      classes() {
        const result = ['gl-input'];
        // console.log(this.$attrs.hasOwnProperty('disabled'));
        if (Reflect.has(this.$attrs, 'disabled')) {
          result.push('gl-input-disabled');
        }
        return result;
      }
    },
    watch: {
      value(newVal) {
        this.currentValue = newVal;
      }
    },
    methods: {
      onInput(event) {
        const value = event.target.value;
        this.setValue(value);
        const glFormItem = findComponentUpward(this, 'glFormItem');
        glFormItem.$emit('onValidtate');
      },
      setValue(value) {
        this.$emit('input', value);
        this.$emit('on-change', value);
      }
    },
    mounted() {
      const glFormItem = findComponentUpward(this, 'glFormItem');
      glFormItem.setFormControl(this);
      this.$on('reset', value => this.setValue(value));
    }
  }
</script>