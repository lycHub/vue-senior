<template>
  <div id="app">
    <h1>{{ title }}</h1>
    <div class="test-box">
      <VirtualTree :source="list" :load-data="loadData" />
    </div>
  </div>
</template>

<script>
  import VirtualTree from './components/virtual-tree';
  import {treeData} from "./data";

  export default {
    name: 'App',
    components: { VirtualTree },
    data() {
      return {
        title: 'Vue',
        list: []
      }
    },
    methods: {
      loadData (item, callback) {
        const children = this.generateBigData();
        setTimeout(() => {
          callback(children);
        }, 100);
      },
      /*generateBigData() {
        const result = [];
        for (let a = 1; a <= 2; a++) {
          result.push({
            title: 'leaf 2-2-2-' + a,
            pid: '0020202',
            id: '00202020' + a,
            isLeaf: true
          })
        }
        return result;
      }*/
      generateBigData() {
        const result = [];
        for (let a = 1; a <= 5000; a++) {
          result.push({
            title: randomString(6) + a,
            pid: '0020202',
            id: randomString(8) + a,
            isLeaf: true
          })
        }
        return result;
      }
    },
    created() {
      // console.log(this.generateBigData());
      setTimeout(() => {
        this.list = treeData;
      }, 500)
    }
  }


  export function randomString (len) {
    len = len || 32
    let $chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678' // 默认去掉了容易混淆的字符oOLl,9gq,Vv,Uu,I1
    let maxPos = $chars.length
    let pwd = ''
    for (let i = 0; i < len; i++) {
      pwd += $chars.charAt(Math.floor(Math.random() * maxPos))
    }
    return pwd
  }
</script>
<style lang="less" scoped>
#app {
  color: #fff;
  h1 {
    font-size: 20px;
  }
  .test-box {
    padding: 20px;
    /*max-height: 320px;*/
    /*overflow-y: auto;*/
  }
}
</style>
