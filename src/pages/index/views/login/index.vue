<template>
  <div class="login-wrap" @keydown.enter="login">
    <div class="login-con">
      <a-card class="box-card">
        <a-card-meta>
          <template #title>
            <span class="login--header">登录</span>
          </template>
        </a-card-meta>
        <a-form
          ref="form"
          :model="form"
          :rules="rules"
        >
          <a-form-item name="userName">
            <span class="svg-container">
              <svg-icon icon-class="user" />
            </span>
            <a-input
              v-model:value="form.userName"
              placeholder="请输入账号"
              class="form--input"
            />
          </a-form-item>
          <!-- <a-form-item name="passWord">
            <span class="svg-container">
              <svg-icon icon-class="password" />
            </span>
            <a-input
              v-model:value="form.passWord"
              :minlength="3"
              :maxlength="18"
              placeholder="请输入密码"
              show-password
              class="form--input"
            />
          </a-form-item> -->
          <!-- <a-form-item>
            <a-button
              :loading="loading"
              type="primary"
              class="login--button"
              @click="login"
            >
              登录
            </a-button>
          </a-form-item> -->
        </a-form>
      </a-card>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, reactive } from 'vue'

interface FormModule {
  userName: string,
  passWord: string
}
interface rulesModule {
  userName: any[],
  passWord: any[]
}

export default defineComponent({
  name: 'Login',
  setup() {
    const loading = ref<boolean>(false)
    const redirect = ref<string>('')
    const form = reactive<FormModule>({
      userName: 'admin',
      passWord: 'admin'
    })
    const rules = reactive<rulesModule>({
      userName: [{ required: true, message: '帐号不能为空' }],
      passWord: [{ required: true, message: '密码不能为空' }]
    })
    function login(): void {
      console.log('哈哈哈哈')
    }
    return {
      loading,
      redirect,
      form,
      rules,
      login
    }
  }
})
</script>

<style lang="less" scoped>
.login-wrap {
  width: 100%;
  height: 100%;
  background-image: url('~@/assets/img/login-bg.jpg');
  background-size: cover;
  background-position: center;
  position: relative;
  .box-card {
    width: 400px;
    .login--header {
      font-size: 24px;
      font-weight: 600;
    }
    .svg-container {
      color: #889aa4;
      vertical-align: middle;
      width: 30px;
      display: inline-block;
    }
    .form--input {
      width: 85%;
    }
    .login--button {
      width: 100%;
    }
  }
  .login-con {
    position: absolute;
    right: 160px;
    top: 50%;
    transform: translateY(-60%);
  }
}
</style>
