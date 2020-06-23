<template >
  <div style="height: 100%;  position: absolute; width: 100%">
    <el-container style="height: 100%;" direction="vertical" >
    <el-header style="height: 100px">

      <div >
        <el-row>
          <el-col  v-if="user.username===''" :span="7" :offset="4">
            <el-row>
              <el-col :span="20" :offset="1"  style=" border:1px solid ;height:auto">
                <el-image :src="user.headurl"
                          style="height: 52px;width: 52px;border-radius:50%;margin-top: 10px">
                </el-image>
                <el-row>
                  <el-menu class="el-menu-demo" mode="horizontal" STYLE="height: 50px">
                    <el-menu-item index="1" @click="" >{{user.username}}</el-menu-item>
                    <el-menu-item index="2" style="color: red" @click="">收货地址</el-menu-item>
                    <el-menu-item index="3" style="color: red" @click="turnToMyOrder">我的订单</el-menu-item>
                    <el-menu-item index="4" style="color: red" @click="getProducts">查看全部商品</el-menu-item>
                  </el-menu>
                </el-row>
              </el-col>
            </el-row>
          </el-col>

          <el-col  v-else :span="10" :offset="4" style=" border:1px solid ;height:auto ">
            <el-row>
              <el-menu class="el-menu-demo" mode="horizontal">
                <el-menu-item index="1" @click="loginVisible=true" >你好，请登录</el-menu-item>
                <el-menu-item index="2" style="color: red" @click="resistVisible=true">免费注册</el-menu-item>
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

    </el-header>
    <el-container style="margin-top: 15px">
      <el-aside width="200px" >
          <el-table
            :data="categories"
            style="width: 100%">
            <el-table-column
              prop="cname"
              label="种类"
              width="180" height="50px">
              <template  slot-scope="scope">
                <el-button size="medium" @click="findProductsByCategory(scope.$index,scope.row)">{{scope.row.cname}}</el-button>
              </template>
            </el-table-column>
          </el-table>
      </el-aside>
      <el-container>
        <el-container>
          <el-main>

            <el-row>
              <p v-if="products.length<=0">暂无商品</p>
              <el-col :span="4" v-else    v-for="product1 in products" :key="product1.pid" :offset="1" style="margin-bottom:40px;margin-left: 50px" >
                <el-card  style="width: 260px;height: 320px;"  :body-style="{ padding: '0px', height:'360px'}">
                  <div style="padding: 6px;height: 310px;">
                  <div>
                  <img :src="product1.ppicture" class="image" style="width: 200px;height: 200px;">
                  </div>
                  <div style="padding: 14px;">
                    <span>{{ product1.pname }}</span>
                    <div v-if="product1.buying">
                      <span style="color: red">已被拍下</span>
                    </div>
                    <div v-else>
                      <br>
                    </div>
                    <div style="position: relative;top: 20px;">
                      <time class="time">¥{{product1.pprice}}</time>
                      <el-button type="text" class="button" @click="lookDetai2(product1)">查看商品</el-button>
                    </div>
                  </div>
                  </div>
                </el-card>
              </el-col>
            </el-row>


          </el-main>
          <el-footer>Footer</el-footer>
        </el-container>
      </el-container>
    </el-container>
      </el-container >

    <el-dialog
      title="登录"
      :visible.sync="loginVisible"
      width="30%"
      :before-close="handleClose">
      <el-row>
        账号:<el-input v-model="login.username" placeholder="请输入账号" style="width: 250px"></el-input>
      </el-row>
      <br>
      <el-row>
        密码:<el-input type="password" v-model="login.password" placeholder="请输入密码" style="width: 250px"></el-input>
      </el-row>
      <span slot="footer" class="dialog-footer">
    <el-button @click="loginVisible = false">取 消</el-button>
    <el-button type="primary" @click="login2">确 定</el-button>
  </span>
    </el-dialog>



    <el-dialog
      title="注册"
      :visible.sync="resistVisible"
      width="30%"
      :before-close="handleClose">
      <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="用户名" prop="username">
          <el-input type="text"  v-model="ruleForm.username" autocomplete="off" ></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input type="password" v-model="ruleForm.password" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="checkPass">
          <el-input type="password" v-model="ruleForm.checkPass" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="上传头像">
          <el-input v-model="ruleForm.headUrl"></el-input>
          <el-upload
            class="upload-facepic"
            action="http://localhost:8080/upload"
            :on-preview="handlePreview"
            :on-remove="handleRemove"
            multiple
            ref="upload"
            :auto-upload="true"
            :limit="1"
            :on-change="handleChange"
            :on-success="uploadSuccess"
          >
            <el-button size="small" type="primary">点击上传</el-button>
            <div slot="tip" class="el-upload__tip">只能上传jpg/jpeg/png文件，且不超过500kb</div>
          </el-upload>
        </el-form-item>

        <el-form-item>
          <el-button  v-if="flag1||flag2||flag3" type="primary" disabled="true">提交</el-button>
          <el-button v-else type="primary" @click="submitForm">提交</el-button>
          <el-button @click="resetForm()">重置</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>



  </div>
</template>

<script>
  import Header from '@/components/Header.vue'
  import Footer from '@/components/Footer.vue'

  export default {

    data() {
      let validateUsername = (rule, value, callback) => {
        if(value===""){
          callback(new Error('用户名不能为空'));
          this.flag1=true;
        }
        else if (value.length<6) {
          callback(new Error('用户名应大于6位'));
          this.flag1=true;
        }
        else {
        this.$axios
          .post('/checkUser', {
            username: this.ruleForm.username,
            password: '',
          })
          .then(successResponse => {
            this.responseResult = JSON.stringify(successResponse.data);
            if (successResponse.data === 'success') {
              callback(new Error('用户名已存在'))
              this.flag1=true;
            }
            else {
              this.flag1=false;
            }
          });
      }


      };

      let validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
          this.flag2=true;
        }
        else if(value.length<6){
          callback(new Error('密码大于6位'))
          this.flag2=true;
        }
        else {
          if (this.ruleForm.checkPass !== '') {
            this.$refs.ruleForm.validateField('checkPass');
            this.flag2=false;
          }
          callback();
        }
      };

      let validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
          this.flag3=true;
        }
        else if (value !== this.ruleForm.password) {
          callback(new Error('两次输入密码不一致!'));
          this.flag3=true;
        }
        else {
          this.flag3=false;
          callback();
        }
      };

      return {
        ruleForm: {
          username:'',
          headUrl:'',
          password: '',
          checkPass: '',
        },
        imgUrl:'',

        flag:true,
        flag1:true,
        flag2:true,
        flag3:true,
        flag4:true,
        user:{
          id:'',
          username:'',
          headurl:'',
        },

        login:{
          username:'',
          password:'',
        },

       products:[],
        dialogVisible:false,
        loginVisible:false,
      categories:[],
        resistVisible:false,
        rules: {
          username:[
            {validator: validateUsername, trigger: 'blur'},
          ],
          password: [
            {validator: validatePass, trigger: 'blur'}
          ],
          checkPass: [
            {validator: validatePass2, trigger: 'blur'}
          ],
        }
      }
    },
    name: 'Home',
    components: { Header, Footer },
    mounted: function() {
      this.getProducts();
      this.getCategories();
      this.getUser();
    },
    methods: {
      getProducts () {
        this.$axios
          .get('/getAllProducts')
          .then(successResponse => {
            this.products =successResponse.data
          })
          .catch(failResponse => {})
      },
      resetForm(){
        this.ruleForm=[];
        this.imgUrl='';
        this.flag=true;

      },


      lookDetail (index,row) {
        // console.log(index);
        // console.log(row.id);
        this.dialogVisible=true;
        const pid = row.pid;
        const pname=row.pname;
        const pprice=row.pprice;

        this.$router.push({name: "ProductDetail", params: {pid:pid}});
      },
      lookDetai2 (product1) {
        // console.log(index);
        // console.log(row.id);
        this.dialogVisible=true;
        const pid = product1.pid;
        const pname=product1.pname;
        const pprice=product1.pprice;

        this.$router.push({name: "ProductDetail", params: {pid:pid}});
      },


      getCategories(){
        this.$axios
          .get('/getAllCategories')
          .then(successResponse => {
            this.categories =successResponse.data
          })
          .catch(failResponse => {})
      },
      turnToAddProduct() {
        this.$router.push({path: '/AddProduct'})
      },
      getUser() {
        this.$axios.get('/getUser')
          .then(successResponse => {
            console.log(successResponse.data)
            if(successResponse.data!='') {
              this.user = successResponse.data
            }
            console.log( "123",successResponse.data)
          }).catch(failResponse => {
        })
      },

      login2 () {

        this.$axios
          .post('/Home1', {
            username: this.login.username,
            password: this.login.password
          })
          .then(successResponse => {
            this.responseResult = JSON.stringify(successResponse.data)
            if (successResponse.data === 'admin') {
              this.$router.push({path: '/AdminHome'})
            }
            else if (successResponse.data === 'normal') {
              this.loginVisible=false;
              this.getUser();
            }
            else {
              alert("用户名或密码错误")
            }
          })
          .catch(failResponse => {})
        this.login={};
      },
      handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePreview(file) {
        console.log(file);
      },

      uploadSuccess(response, file, fileList) {
        this.imgUrl=response;
        if(response!=null){
          this.$message({
            message: '导入成功',
            type: 'success'
          });
        }else {
          this.$message({
            message: '导入失败',
            type: 'error'
          });
        }
      },
      handleChange:function (file, fileList,res) {
        this.ruleForm.headUrl = file.name;
      },
      submitForm(){
        this.resistVisible=false;
        this.$axios
          .post('/resistController', {
            username: this.ruleForm.username,
            password: this.ruleForm.password,
            headurl: this.imgUrl,
          })
          .then(successResponse => {
            this.responseResult = JSON.stringify(successResponse.data);
            if (successResponse.data === 'success') {
              alert("注册成功");
            }
            else {
              alert("注册失败");
            }
          })
         this.flag1=true;
        this.flag2=true;
        this.flag3=true;
          this.ruleForm={};
          this.imgUrl='';
      },
      handleClose(){
        this.loginVisible=false;
        this.resistVisible=false;
        this.ruleForm={};
        this.login={};
        this.flag1=true;
        this.flag3=true;
        this.imgUrl='';

      },
      findProductsByCategory(index,row){
        this.$axios
          .post('/getProductsByCategory', {
            cid:row.cid,
            cname:row.cname
          })
          .then(successResponse => {
            this.products =successResponse.data
          })
          .catch(failResponse => {})
      },

      turnToMyOrder(){
        this.$router.push({path: '/MyOrder'});
      }

    }







  }
</script>

<style>

  .el-aside {
    background-color: #D3DCE6;
    color: #333;
    text-align: center;
    line-height: 100px;
    height: 300px;
  }

  .time {
    font-size: 17px;
    color: red;
  }

  .bottom {
    margin-top: 13px;
    line-height: 12px;
  }

  .button {
    padding: 0;
    float: right;
  }

  .image {
    width: 300px ;
    display: block;
    margin: 0 auto;

  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }

  .clearfix:after {
    clear: both
  }



</style>
