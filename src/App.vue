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
        }
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
    }
  }
</script>