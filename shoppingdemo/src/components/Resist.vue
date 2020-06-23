<template>
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
        :file-list="fileList"
      >
        <el-button size="small" type="primary">点击上传</el-button>
        <div slot="tip" class="el-upload__tip">只能上传jpg/jpeg/png文件，且不超过500kb</div>
      </el-upload>
    </el-form-item>

    <el-form-item>
      <el-button  v-if="flag===true" type="primary" disabled="true">提交</el-button>
      <el-button v-else type="primary" @click="submitForm">提交</el-button>
      <el-button @click="resetForm('ruleForm')">重置</el-button>
    </el-form-item>
  </el-form>


</template>

<script>
    export default {
      name: "Resist",
      data() {
        let validateUsername = (rule, value, callback) => {
          this.$axios
            .post('/checkUser', {
              username: this.ruleForm.username,
              password: '',
            })
            .then(successResponse => {
              this.responseResult = JSON.stringify(successResponse.data);
              if (successResponse.data === 'success') {
                callback(new Error('用户名已存在'))
                this.flag=true;
              }

            })

          if (value.length<6) {
            callback(new Error('用户名应大于6位'));
            this.flag=true;
          }
        };

        let validatePass = (rule, value, callback) => {
          if (value === '') {
            callback(new Error('请输入密码'));
            this.flag=true;
          }
          else if(value.length<6){
            callback(new Error('密码大于6位'))
            this.flag=true;
          }
          else {
            if (this.ruleForm.checkPass !== '') {
              this.$refs.ruleForm.validateField('checkPass');
            }
            callback();
          }
        };
        let validatePass2 = (rule, value, callback) => {
          if (value === '') {
            callback(new Error('请再次输入密码'));
            this.flag=true;
          }
          else if (value !== this.ruleForm.password) {
            callback(new Error('两次输入密码不一致!'));
            this.flag=true;
          } else {
            this.flag=false;
            callback();
          }
        };
        return {
          flag:true,
          ruleForm: {
            username:'',
            headUrl:'',
            password: '',
            checkPass: '',
          },
          imgUrl:'',
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
        };
      },

      methods:{
        handleRemove(file, fileList) {
          console.log(file, fileList);
        },
        handlePreview(file) {
          console.log(file);
        },

        uploadSuccess(response, file, fileList) {
          this.ruleForm.headUrl=response;
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

        }
      }
    }
</script>

<style scoped>

</style>
