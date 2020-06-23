<template>
  <div style="height: 100px">
  <el-row>
    <el-col  v-if="user.username!=''" :span="7" :offset="4" style=" border:1px solid red;height: 95px">
      <el-row>
        <el-col :span="10" style=" border:1px solid red;">
        <el-image :src="user.headurl"
          style="height: 52px;width: 52px;border-radius:50%;">
        </el-image>
          <span>{{user.username}}</span>
          <span>收货地址</span>
        </el-col>
      </el-row>

      <el-row>
        <span>订单</span>
      </el-row>
    </el-col>

    <el-col  v-else :span="10" :offset="4" style=" border:1px solid ;height:auto ">
      <el-row>
        <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
          <el-menu-item index="1" >你好，请登录</el-menu-item>
          <el-menu-item index="2" style="color: red">免费注册</el-menu-item>
          <el-menu-item index="3" >消息中心</el-menu-item>
        </el-menu>
      </el-row>
    </el-col>

    <el-col :span="2" >
      <div>
    <el-button v-if="user.username!=''" @click="turnToAddProduct" style="position: absolute;right: 15%">发布商品</el-button>
    </div>
    </el-col>
  </el-row>
  </div>

</template>

<script>
  export default {
    name: 'Header',
    data () {
      return {
        user:{
          id:'',
          username:'',
          headurl:'',

        },
        flag:false,
        nowuser:'',
        responseResult: '',
        url: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg'
      }
    },
    mounted: function() {
      this.getUser();
    },
    methods: {
    turnToAddProduct() {
      this.$router.push({path: '/AddProduct'})
    },
      getUser() {
        this.$axios.get('/getUser')
          .then(successResponse => {
            console.log(successResponse.data)
            if(successResponse.data!='') {
              this.user = successResponse.data
              this.flag = true;
            }
              else this.flag=false;
            console.log( "123",successResponse.data)
          }).catch(failResponse => {
        })
      },
    }


  }
</script>

<style>
  .text {
    font-size: 14px;
  }

  .item {
    margin-bottom: 18px;
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }
  .clearfix:after {
    clear: both
  }

  .box-card {
    width: 480px;
  }
</style>
