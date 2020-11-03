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
    <picker :data="singleArea" v-model="value" />
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
        // value: [{
        //   value: 1018,
        //   label: '延庆县'
        // }],
        value: [],
        singleArea: [
          {
            value: 1001,
            label: '东城区'
          },
          {
            value: 1002,
            label: '西城区'
          },
          {
            value: 1003,
            label: '崇文区'
          },
          {
            value: 1004,
            label: '宣武区'
          },
          {
            value: 1005,
            label: '朝阳区'
          },
          {
            value: 1006,
            label: '丰台区'
          },
          {
            value: 1007,
            label: '石景山区'
          },
          {
            value: 1008,
            label: '海淀区'
          },
          {
            value: 1009,
            label: '门头沟区'
          },
          {
            value: 1010,
            label: '房山区'
          },
          {
            value: 1011,
            label: '通州区'
          },
          {
            value: 1012,
            label: '顺义区'
          },
          {
            value: 1013,
            label: '昌平区'
          },
          {
            value: 1014,
            label: '大兴区'
          },
          {
            value: 1015,
            label: '平谷区'
          },
          {
            value: 1016,
            label: '怀柔区'
          },
          {
            value: 1017,
            label: '密云县'
          },
          {
            value: 1018,
            label: '延庆县'
          }
        ]
      }
    },
    watch: {
      value(n) {
        console.log('n', n);
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
