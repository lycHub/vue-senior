export function getEventTarget(event) {
  if (
    event.type === 'mousedown' ||
    event.type === 'mousemove' ||
    event.type === 'mouseup' ||
    event.type === 'mouseleave'
  ) {
    return event;
  } else {
    if (event && event.changedTouches && event.changedTouches[0]) {
      return event.changedTouches[0];
    }
  }
}


export function getVelocity() {
  // 滑动事件正常的触发频率 30 ~ 100
  return ((minInterval = 30, maxInterval = 100) => {
    let _time = 0;  // 记录上一次的时间戳
    let _y = 0;     // 记录上一次的diffY
    let _velocity = 0;    // 速度
    const recorder = {
      record: y => {  // 滑动时的diffY
        const now = +new Date();
        // 滑动速度 = 距离 / 时间
        _velocity = (y - _y) / (now - _time);
        if (now - _time >= minInterval) {
          /*
          * now - _time 在首次滑动和停顿再滑动时会大于100毫秒
          * 也就是判断滑动过程中是否停顿
          * */
          _velocity = now - _time <= maxInterval ? _velocity : 0;
          _y = y;
          _time = now;
        }
        // console.log('_y', _y);
      },
      getVelocity: y => { // 鼠标抬起，最后的滑动距离
        console.log('比较', y, _y);
        if (y !== _y) { // 滑动很快，最后的滑动距离没被记录，最后的滑动距离就不等于滑动时的differY了
          recorder.record(y);
        }
        // console.log('_velocity', _velocity);
        return _velocity;
      }
    };
    return recorder;
  })();
}
