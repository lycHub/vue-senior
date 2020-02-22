<template>
  <div id="app">
    <h1>{{ title }}</h1>
    <div class="comp-demo">
      <gl-form ref="formIns" :model="formValues" :rules="rules">
        <gl-form-item label="用户名：" prop="username" class="form-item">
          <gl-input class="form-control" disabled placeholder="用户名" v-model="formValues.username"></gl-input>
        </gl-form-item>
        <gl-form-item label="密码：" prop="password" class="form-item">
          <gl-input class="form-control" type="password" placeholder="密码" v-model="formValues.password"></gl-input>
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
          username: '张三',
          password: '123456',
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
      onReset() {
        this.$refs['formIns'].resetFields();
      },
      onSubmit() {
        this.$refs['formIns'].validate(valid => {
          if (valid) {
            alert('ok');
          } else {
            alert('fail');
          }
        })
      }
    }
  }
</script>
