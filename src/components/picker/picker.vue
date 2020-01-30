<template>
  <div class="picker">
    <div class="picker-wrap">
      <div class="am-picker-header">
        <div class="am-picker-item"> 取消 </div>
        <div class="am-picker-item am-picker-title"></div>
        <div class="am-picker-item am-picker-header-right">确定</div>
      </div>
      <div class="am-picker-body">
        <div class="am-picker-col"
             ref="col"
             @touchstart="panstart"
             @touchmove="panmove"
             @touchend="panend">
          <div class="am-picker-col-indicator"></div>
          <ul class="am-picker-col-content">
            <div class="am-picker-col-item" v-for="item of data" :key="item.value">{{item.label}}</div>
          </ul>
          <div class="am-picker-col-mask" data-id="0"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {getEventTarget, getVelocity} from "./helper";

  export default {
    name: "Picker",
    props: {
      data: {
        type: Array,
        default() {
          return [];
        }
      },
      value: [Array, String, Number]
    },
    data() {
      return {
        isMouseDown: false,
        startY: 0,
        currentY: 0,
        selectedIndex: 0,
        differY: 0,
        maxLen: 0,
        len: 0,
        maxY: 0,
        lineHeight: 34,
        currentValue: [],
        selectTargets: [],  // 记录每一列的currentY
        velocity: getVelocity()
      }
    },
    methods: {
      panstart(event) {
        const ev = getEventTarget(event);
        if (ev.target.classList.contains('am-picker-col-mask')) {
          this.dom = ev.target.parentElement.querySelector('.am-picker-col-content');
          this.len = this.dom.children.length;
          this.maxY = -(this.len - 1);  // -17
          if (this.selectTargets.length) {
            for (const item of this.selectTargets) {
              if (item.colId === Number(ev.target.dataset.id)) {
                this.currentY = item.currentY;
                break;
              }
            }
          } else {
            this.currentY = 0;
          }
          
          this.startY = ev.clientY;
          this.isMouseDown = true;
        }
      },
      panmove(event) {
        if (this.isMouseDown) {
          // 上滑负数，下滑正
          this.differY = getEventTarget(event).clientY - this.startY;
          this.velocity.record(this.differY);
          this.dom.style.transition = 'transform 0s';
          this.dom.style.transform = `translateY(${this.currentY * this.lineHeight + this.differY}px)`;
        }
      },
      panend(event) {
        this.isMouseDown = false;
        event.preventDefault();
        const ev = getEventTarget(event);
        this.differY = ev.clientY - this.startY;
        let time = 0.3;
        const velocityTemp = this.velocity.getVelocity(this.differY) * 5;
        console.log('velocityTemp', velocityTemp);
        if (velocityTemp) {
          this.differY = velocityTemp * 50 + this.differY;  // 最钟的滑动距离
          time = Math.abs(velocityTemp) * 0.1;
        }
        this.dom.style.transition = 'transform ' + Math.min(time, 0.3) + 's';
        if (this.differY <= -this.lineHeight / 2) { // 上滑距离大于this.lineHeight / 2时
          // 经过了几个item
          this.currentY += Math.floor(this.differY / this.lineHeight);
          // console.log('上滑', this.currentY);
          if (this.currentY <= this.maxY) {
            this.currentY = this.maxY;
          }
        } else if (this.differY >= this.lineHeight / 2) { // 下拉距离大于this.lineHeight / 2时
          this.currentY += Math.ceil(this.differY / this.lineHeight);
          // console.log('下啦', this.currentY);
          if (this.currentY >= 0) {
            this.currentY = 0;
          }
        }
        this.dom.style.transform = `translateY(${this.currentY * this.lineHeight}px)`;
        this.selectTargets = [{
          colId: 0,
          currentY: this.currentY
        }];
        this.selectedIndex = Math.abs(this.currentY);
        this.setValue(this.data[this.selectedIndex]);
      },
      setValue(value) {
        console.log('setValue');
        if (value) {
          const trueValue = Array.isArray(value) ? value : [value];
          this.currentValue = trueValue;
        } else {
          this.currentValue = [];
        }
        // console.log(this.currentValue);
        this.$emit('input', this.currentValue);
        this.$emit('on-change', this.currentValue);
      },
      refreshPicker() {
        if (this.data.length) {
          const currentValue = this.currentValue[0];
          const targetIndex = this.data.findIndex(item => {
            return item.value === currentValue.value;
          });
          if (targetIndex > -1) {
            this.currentY = targetIndex;
            this.selectTargets = [{
              colId: 0,
              currentY: -targetIndex
            }];
            this.$refs['col'].querySelector('.am-picker-col-content').style.transform = `translateY(${-this.currentY * this.lineHeight}px)`;
          }
        }
      },
      init() {
        this.setValue(this.value);
        if (this.currentValue.length) {
          this.refreshPicker();
        }
      }
    },
    mounted() {
      console.log(this.value);
      if (this.value) {
        this.init();
      }
    }
  }
</script>

<style scoped lang="less">
  .picker {
    position: fixed;
    min-height: 3.733rem;
    overflow: auto;
    right: 0;
    bottom: 0;
    left: 0;
    // 手指放开时，启用滚动回弹效果
    -webkit-overflow-scrolling: touch;
    .picker-wrap {
      .am-picker-header {
        position: relative;
        background-color: #fff;
        display: flex;
        align-items: center;
        border-bottom: 1px solid #d9d9d9;
        @media (-webkit-min-device-pixel-ratio: 2), (min-resolution: 2dppx) {
          .am-picker-header {
            border-bottom: none;
          }
        }
        .am-picker-item {
          color: #108ee9;
          font-size: 17px;
          padding: 0.12rem 0.2rem;
          height: 0.56rem;
          box-sizing: border-box;
          display: flex;
          align-items: center;
          justify-content: center;
          &.am-picker-title {
            flex: 1;
            text-align: center;
            color: #000;
          }
          &.am-picker-header-right {
            text-align: right;
          }
        }
      }
      
      .am-picker-body {
        display: flex;
        align-items: center;
        background-color: #fff;
        .am-picker-col {
          display: block;
          position: relative;
          height: 3.8rem;
          overflow: hidden;
          width: 100%;
          
          .am-picker-col-indicator {
            width: 100%;
            height: 0.453rem;
            position: absolute;
            left: 0;
            top: 1.653rem;
            border-top: 1px solid #d9d9d9;
            border-bottom: 1px solid #d9d9d9;
          }
          .am-picker-col-mask {
            position: absolute;
            left: 0;
            top: 0;
            height: 100%;
            margin: 0 auto;
            width: 100%;
            background-image: linear-gradient(to bottom,rgba(255,255,255,.95),rgba(255,255,255,.6)),linear-gradient(to top,rgba(255,255,255,.95),rgba(255,255,255,.6));
            /*background-image: linear-gradient(to bottom, rgba(74, 255, 152, 0.95), rgba(255, 67, 65, 0.6)),linear-gradient(to top, rgba(104, 255, 118, 0.95), rgba(255, 102, 105, 0.6));*/
            background-position: top,bottom;
            background-size: 100% 1.653rem;
            background-repeat: no-repeat;
            z-index: 1;
          }
          .am-picker-col-content {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            padding: 1.68rem 0;
            .am-picker-col-item {
              touch-action: manipulation;
              text-align: center;
              font-size: 0.213rem;
              height: 0.453rem;
              line-height: 0.453rem;
              color: #000;
              white-space: nowrap;
              text-overflow: ellipsis;
            }
          }
        }
    }
  }
}
</style>
