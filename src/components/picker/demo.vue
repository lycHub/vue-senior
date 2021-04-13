<template>
  <div class="demo-box">
    <picker :data="list" />
  </div>
</template>

<script>
  import { singlePicker } from '../../data';
  import Picker from './picker'
  export default {
    name: "PickerDemo",
    components: { Picker },
    data() {
      return {
        list: singlePicker
      }
    }
  }
</script>

<style scoped>

</style>
