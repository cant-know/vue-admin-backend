<template>
  <div class="container">
    <div class="box">
      <div class="left">
        <img src="@/assets/images/login_left.png"/>
      </div>
      <div class="login">
        <div class="form-top">
          <img class="login-icon" src="@/assets/images/logo.svg" alt="" />
          <h2 class="logo-text">Vue-admin</h2>
        </div>
        <div class="form">
          <el-form
          :model="formData"
          :rules="rules"
          label-width="0px"
        >
          <el-form-item prop="name">
            <el-input v-model="formData.name" :prefix-icon="User" placeholder="请写一个正常的用户名" autocomplete="off" />
          </el-form-item>
          <el-form-item prop="password">
            <el-input
              v-model="formData.password"
              :prefix-icon="Lock"
              placeholder="请写一个正常的密码"
              type="password"
              autocomplete="off"
            />
          </el-form-item>
          <el-form-item prop="email">
            <el-input v-model="formData.email" :prefix-icon="Message" placeholder="请输入一个正常的邮箱地址"/>
          </el-form-item>
          <el-form-item prop="identity">
            <el-select v-model="formData.identity" placeholder="请选择一个正常的身份">
              <el-option label="神中神" value="god" />
              <el-option label="普通人" value="person" />
            </el-select>
          </el-form-item>
        </el-form>
        <div class="btn">
          <el-button 
          v-loading.fullscreen.lock="fullscreenLoading" 
          :icon="CircleClose" 
          size="large" 
          type="primary" 
          round
          @click="login"
            >登录</el-button>
          <el-button 
          v-loading.fullscreen.lock="fullscreenLoading" 
          :icon="UserFilled" 
          size="large"  
          type="info" 
          round 
          @click="getRegisterInfo"
            >注册</el-button>
        </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { User,Lock,CircleClose,UserFilled,Message } from '@element-plus/icons-vue'
import { reactive,ref } from 'vue'
import { getRegister,getLogin } from '../../api/user';
import { ElMessage } from 'element-plus'
import { useRouter } from 'vue-router';
import type { LoginResponseData } from '../../api/user/type'

const $router = useRouter()
const fullscreenLoading = ref(false)
let formData = reactive({
  name: '',
  password: '',
  email: '',
  identity: ''
})

const rules = reactive({
  name: {required: true,message: '请输入用户名',trigger: 'blur'},
  password: {required: true,message: '请输入密码',trigger: 'blur'},
  email: {required: true,message: '请输入邮箱地址',trigger: 'blur'},
  identity: {required: true,message: '请选择您的身份',trigger: 'blur'}
})

const goHome = () => {
  $router.push('/home')
}

// 点击注册按钮
const getRegisterInfo = async () => {
  try {
    await getRegister(formData)
    openFullScreen1()
    ElMessage({
      type:'success',
      message:'注册成功'
    })
    goHome()
  } catch (error) {
    ElMessage({
      type:'error',
      message:'注册失败'
    })
  }
}

// 点击登录按钮
const login = async () => {
  try {
    const result:LoginResponseData = await getLogin(formData)
    localStorage.setItem('token',result.token)
    openFullScreen1()
    ElMessage({
      type:'success',
      message: '登录成功'
    })
    goHome()
  } catch (error) {
    ElMessage({
      type: 'error',
      message: '登录失败'
    })
  }
}

// 设置加载动画
const openFullScreen1 = () => {
  fullscreenLoading.value = true
  setTimeout(() => {
    fullscreenLoading.value = false
  }, 2000)
}

</script>

<style lang="scss" scoped>
@import './index.scss'
</style>