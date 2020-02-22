<template>
  <div class="gl-input-wrap">
    <input :class="classes" @input="oninput" v-bind="$attrs" :value="val" />
  </div>
</template>

<script>
  import {findComponentUpward} from "../utils/assits";

  export default {
    name: "glInput",
    inheritAttrs: false,
    /*model: {
      prop: 'value2',
      event: 'change'
    },*/
    props: {
      value: {
        type: [String, Number],
        default: ''
      }
    },
    data() {
      return {
        val: this.value
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
        this.val = newVal;
      }
    },
    methods: {
      oninput(event) {
        // console.log(event.target.value);
        const value = event.target.value;
        this.$emit('input', value);
        this.$emit('onChange', value);
        const formItemIns = findComponentUpward(this, 'glFormItem');
        if (formItemIns) {
          formItemIns.$emit('onValidate', value);
        }
      }
    },
    mounted() {
      const formItemIns = findComponentUpward(this, 'glFormItem');
      if (formItemIns) {
        formItemIns.setForControl(this);
      }
      this.$on('reset', value => {
        this.$emit('input', value);
        this.$emit('onChange', value);
      })
    }
  }
</script>
