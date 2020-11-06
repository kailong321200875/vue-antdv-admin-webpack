<template>
  <div class="login-wrap">
    <div class="login-con">
      <a-card class="box-card">
        <a-card-meta>
          <template #title>
            <span class="login--header">登录</span>
          </template>
        </a-card-meta>
        <a-form
          ref="loginForm"
          :model="form"
          :rules="rules"
          class="login-form"
        >
          <a-form-item name="userName">
            <a-input
              v-model:value="form.userName"
              size="large"
              placeholder="请输入账号"
              class="form--input"
            >
              <template #prefix>
                <span class="svg-container">
                  <svg-icon icon-class="user" />
                </span>
              </template>
            </a-input>
          </a-form-item>
          <a-form-item name="passWord">
            <a-input-password
              v-model:value="form.passWord"
              size="large"
              visibility-toggle
              :minlength="3"
              :maxlength="18"
              placeholder="请输入密码"
              class="form--input"
            >
              <template #prefix>
                <span class="svg-container">
                  <svg-icon icon-class="password" />
                </span>
              </template>
            </a-input-password>
          </a-form-item>
          <a-form-item>
            <a-button
              :loading="loading"
              size="large"
              type="primary"
              class="login--button"
              @click="login"
            >
              登录
            </a-button>
          </a-form-item>
        </a-form>
      </a-card>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, unref, reactive, getCurrentInstance, watch } from 'vue'
import { useRouter } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'
import { permissionStore } from '_p/index/store/modules/permission'
interface FormModule {
  userName: string,
  passWord: string
}
interface RulesModule {
  userName: any[],
  passWord: any[]
}

export default defineComponent({
  name: 'Login',
  setup() {
    const { proxy } = getCurrentInstance() as any
    const { push, addRoute, currentRoute } = useRouter()
    const loginForm = ref<any>(null)
    const loading = ref<boolean>(false)
    const redirect = ref<string>('')
    watch(() => {
      return currentRoute.value
    }, (route) => {
      redirect.value = (route.query && route.query.redirect) as string
    }, {
      immediate: true
    })
    const form = reactive<FormModule>({
      userName: 'admin',
      passWord: 'admin'
    })
    const rules = reactive<RulesModule>({
      userName: [{ required: true, message: '请输入账号' }],
      passWord: [{ required: true, message: '请输入密码' }]
    })
    async function login(): Promise<void> {
      const form = unref(loginForm)
      if (!form) return
      loading.value = true
      try {
        const data: FormModule = await form.validate()
        permissionStore.GenerateRoutes().then(() => {
          permissionStore.addRouters.forEach(async(route: RouteRecordRaw) => {
            await addRoute(route.name!, route) // 动态添加可访问路由表
          })
          proxy.$wsCache.set(proxy.$config.user_info, data)
          proxy.$wsCache.set('addRouters', permissionStore.addRouters)
          permissionStore.SetIsAddRouters(true)
          push({ path: redirect.value || '/' })
        })
      } catch (err) {
        console.log(err)
      } finally {
        loading.value = false
      }
    }
    return {
      loginForm,
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
    .login-form {
      margin-top: 20px;
    }
    .svg-container {
      color: #889aa4;
      vertical-align: middle;
      width: 30px;
      display: inline-block;
    }
    .form--input {
      width: 100%;
      ::v-deep .ant-input {
        padding-left: 35px;
      }
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
