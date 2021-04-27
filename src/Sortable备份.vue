<template>
  <div class="sortable">
    <ul id="container" @dragstart="onDragStart" @dragover="onDragOver" @dragend="onDragEnd">
      <li class="ele" draggable="true" v-for="(item, index) of list" :key="item">{{ item }}--{{ index }}</li>
    </ul>
  </div>
</template>

<script>
  export default {
    name: 'Sortable',
    data () {
      return {
        base: Object.preventExtensions({
          dragging: null,
          prevNext: null,
          timer: null,
          target: null
        }),
        list: ['a', 'b', 'c', 'd', 'e', 'f', 'g']
      }
    },
    methods: {
      onDragStart(event) {
        event.dataTransfer.setData('te', event.target.innerText);
        this.base.dragging = event.target;
        this.base.prevNext = this.base.dragging.nextElementSibling; // 下一个同级的元素节点
      },
      onDragOver(event) {
        event.preventDefault();
        this.base.target = event.target;
      },
      onDragEnd(event) {
        const { dragging, prevNext, target } = this.base;
        if(target.nodeName === 'LI'&& target !== dragging){
          if (target.animated) {
            return;
          }
          const targetRect = target.getBoundingClientRect();
          const dragingRect = dragging.getBoundingClientRect();
          //拖拽排序
          if(_index(dragging) < _index(target)){ // 往下拖
            target.parentNode.insertBefore(dragging, target.nextSibling);
            target.parentNode.insertBefore(target, prevNext);
          } else {
            target.parentNode.insertBefore(dragging, target);
            target.parentNode.insertBefore(target, prevNext);
          }
          //然后在交换位置之后再次获取元素位置
          console.log('targetRect', targetRect);
          _animate(targetRect, target);
          // _animate(dragingRect, dragging);
        }
      }
    },
    mounted () {
      // const container = this.$el.getElementById('container');
    }
  }

  //当前li的index大于容器li时就插入在容器的前面，反之插入在容器的后面
  function _index(el){
    var index=0;
    if(!el||!el.parentNode){
      return -1;
    }
    while(el&&(el=el.previousElementSibling)){
      index++;
    }
    return index;
  }
  //动画方法
  function _animate(preventRect, target){
    const currentRect=target.getBoundingClientRect();
    target.style.transition='none';
    target.style.transform='translate3d(' +(preventRect.left - currentRect.left) + 'px,' +(preventRect.top - currentRect.top) + 'px,0)';
    //触发重绘
    target.offsetWidth;
    target.style.transition='all 300ms';
    target.style.transform='translate3d(0, 0, 0)';
    clearTimeout(target.animated);
    target.animated = setTimeout(() => {
      target.style.transition = '';
      target.style.transform = '';
      target.animated = false;
    }, 300);
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
</style>
