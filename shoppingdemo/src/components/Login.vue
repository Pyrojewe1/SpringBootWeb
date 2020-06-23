<template>
  <div>
    <hr/>

    <div>
      <el-row>
        用户名:<input type="text"  v-model="loginInfoVo.username" placeholder="请输入用户名" />
      </el-row>
      <el-row>
      密码：<input type="password" v-model="loginInfoVo.password" placeholder="请输入密码" />
      </el-row>
      <button v-on:click="login">登录</button>
      <br/>
    </div>
    <hr/>




    <Footer></Footer>
  </div>
</template>

<script>
  import Footer from '@/components/Footer.vue'
  import Header from "./Header";

  export default {
    name: 'Login',

    components: {Header, Footer },
    data () {
      return {
        loginInfoVo: { username: '', password: '' },
        responseResult: ''
      }
    },
    methods: {
      login () {
        this.$axios
          .post('/Home1', {
            username: this.loginInfoVo.username,
            password: this.loginInfoVo.password
          })
          .then(successResponse => {
            this.responseResult = JSON.stringify(successResponse.data)
            if (successResponse.data === 'admin') {
              this.$router.push({path: '/AdminHome'})
            }
            else if (successResponse.data === 'normal') {
              this.$router.push({path: '/Home'})
            }
            else {
              alert("用户名或密码错误")
            }
          })
          .catch(failResponse => {})
      }
    }
  }
</script>
