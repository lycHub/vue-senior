<template>
  <div class="sortable">
    <transition-group
      name="flip-list"
      tag="ul"
      id="container"
      @dragstart.native="onDragStart"
      @dragover.native="onDragOver"
      @dragend.native="onDragEnd"
      @drop.native="onDrop">
      <li class="ele" draggable="true" v-for="(item, index) of list" :key="item" :data-index="index">{{ item }}--{{ index }}</li>
    </transition-group>
  </div>
</template>

<script>
  export default {
    name: 'Sortable',
    data () {
      return {
        base: Object.preventExtensions({
          dragging: null,
          timer: null,
          target: null
        }),
        list: ['a', 'b', 'c', 'd', 'e', 'f', 'g']
      }
    },
    methods: {
      onDragStart(event) {
        event.dataTransfer.setData('dragContent', event.target.innerText);
        this.base.dragging = event.target;
      },
      onDragOver(event) {
        event.preventDefault();
        this.base.target = event.target;
      },
      onDrop(event) {
        console.log('onDrop', event.dataTransfer.getData('dragContent'));
      },
      onDragEnd() {
        console.log('onDragEnd');
        const { dragging, target } = this.base;
        if(target.nodeName === 'LI'&& target !== dragging){
          //拖拽排序
          const draggingIndex = _index(dragging);
          const targetIndex = _index(target);
          [this.list[draggingIndex], this.list[targetIndex]] = [this.list[targetIndex], this.list[draggingIndex]];
          this.list = this.list.slice();
        }
      }
    },
    mounted () {
      // const container = this.$el.getElementById('container');
    }
  }

  function _index(el){
    return +el.dataset.index;
  }
</script>

<style scoped>
  .sortable ul {
    list-style: none;
  }
  .sortable ul li {
    font-size: 16px;
    width: 100px;
    height: 40px;
    border: 1px solid #999;
    background: #EA6E59;
    margin: 2px 0;
    border-radius: 10px;
    padding-left: 10px;
    color: white;
    cursor: move;
  }
  .flip-list-move {
    transition: transform .2s;
  }
</style>
