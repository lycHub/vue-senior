<template>
  <div id="app">
    <h1>{{ title }}</h1>
    <div class="test-box">
      <slide class="slide">
        <slide-item class="slide-item" name="slide1">
          <p>slide 1</p>
        </slide-item>
        <slide-item class="slide-item" name="slide2">
          <p>slide 2</p>
        </slide-item>
        <slide-item class="slide-item" name="slide3">
          <p>slide 3</p>
        </slide-item>
      </slide>
    </div>
  </div>
</template>

<script>
  import Slide from './components/slide/slide';
  import SlideItem from './components/slide/slide-item';
  export default {
    name: 'App',
    components: { Slide, SlideItem },
    data() {
      return {
        title: 'Senior Vue',
        currentType: 'A'
      }
    },
    methods: {

    }
  }
</script>
<style lang="less" scoped>
  #app {
    color: #fff;
    h1 {
      font-size: 20px;
    }
    .test-box {
      padding: 20px 0;
      .slide {
        .slide-item {
          text-align: center;
          height: 150px;
          line-height: 150px;
          background-color: #19be6b;
          &:nth-child(2) {
            background-color: #3950be;
          }
          &:nth-child(3) {
            background-color: #be5a54;
          }
        }
      }
    }
  }
</style>
