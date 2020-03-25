<template>
  <div id="app">
    <h1>{{ title }}</h1>
    <div class="comp-demo">
      <gl-form ref="glForm" :model="formValues" :rules="rules">
        <gl-form-item class="form-item" label="用户名：" prop="username">
          <gl-input v-model="formValues.username" placeholder="请输入用户名" class="form-control"></gl-input>
        </gl-form-item>
        <gl-form-item class="form-item" label="密码：" prop="password">
          <gl-input v-model="formValues.password" type="password" class="form-control" placeholder="请输入密码"></gl-input>
        </gl-form-item>
        <gl-form-item class="form-item">
          <div class="btns">
            <button @click="onReset" class="btn btn-default">重置</button>
            <button @click="onSubmit" class="btn">提交</button>
          </div>
        </gl-form-item>
      </gl-form>
    </div>
    <div class="wrapper">
      <div class="box">box</div>
      <div class="box box2">box2</div>
      <gl-lazy transit>
        <div class="box box3">box3</div>
      </gl-lazy>
      <div class="box box4">box4</div>
      <div class="box box5">box5</div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'App',
    data() {
      return {
        title: 'Senior Vue',
        formValues: {
          username: '',
          password: ''
        },
        rules: {
          username: [
            { required: true, message: '请填写用户名' }
          ],
          password: [
            { required: true, message: '请填写密码' },
            { type: 'string', min: 6, message: '至少6位密码' }
          ],
        },
        io: null
      }
    },
    methods: {
      onSubmit() {
        this.$refs['glForm'].validate(valid => {
          console.log('valid', valid);
          if (valid) {
            this.$notice.success({
              content: '提交成功'
            });
          } else {
            this.$notice.error({
              content: '提交失败'
            });
          }
        });
      },
      onReset() {
        this.$refs['glForm'].resetFileds();
      }
    },
    mounted() {
     /* this.io = new IntersectionObserver(entries => {
        // entries是被监测节点的集合
        console.log('变了' );
        if (entries[0].intersectionRatio <= 0) {
          console.log('不可见');
        } else {
          console.log('可见');
        }
      });*/

      // 监测指定节点
      // this.io.observe(this.$refs['box3']);
      // this.io.observe(this.$refs['box4']);   可监测多个
    }
  }
</script>
<style lang="less" scoped>
  #app {
    .wrapper {
      height: 6.667rem;
      overflow: scroll;
      .box {
        height: 6.667rem;
        line-height: 6.667rem;
        background-color: #2b85e4;
        color: #fff;
        font-size: 0.24rem;
        text-align: center;
      }
      .box2 {
        background-color: #19be6b;
      }
      .box3 {
        background-color: #b8be2c;
      }
      .box4 {
        background-color: #be7944;
      }
      .box5 {
        background-color: #992abe;
      }
    }
  }
</style>