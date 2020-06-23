<template>
  <div>
    <el-form ref="form" :rules="rules" :model="product" label-width="80px">
      <el-form-item label="商品名称" prop="pname">
        <el-input v-model="product.pname"></el-input>
      </el-form-item>
      <el-form-item label="商品价格" prop="pprice">
        <el-input v-model="product.pprice"></el-input>
      </el-form-item>
        <el-form-item label="商品描述" prop="pdiscription">
          <el-input v-model="product.pdiscription" ></el-input>
        </el-form-item>
      <el-form-item label="商品分类" prop="pcategoryid">
        <el-select v-model="product.pcategoryid" placeholder="请选择商品分类">
          <el-option
            v-for="(item,index) in categories"
            :key="item.cid"
            :label="item.cname"
            :value="item.cid">
          </el-option>
        </el-select>
      </el-form-item>


      <el-form-item label="封面图片">
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
        <el-button v-if="flag1||flag2||product.pcategoryid===''" type="primary"  disabled="true">立即创建</el-button>
        <el-button v-else type="primary" @click="onsubmit">立即创建</el-button>
        <el-button>取消</el-button>
      </el-form-item>
    </el-form>

  </div>
</template>

<script>
    export default {
      name: "AddProduct",
      data() {


        let validatePname= (rule, value, callback) => {
          if (value === '') {
            callback(new Error('商品名称不能为空'));
            this.flag1=true;
          }
          else if(value.substr(0,1)===' '){
            callback(new Error('商品名称第一个字符不能为空格'));
            this.flag1=true;
          }
          else
            this.flag1=false;
        };
        let validatePprice= (rule, value, callback) => {
          function isNumber(val){
            var regPos = /^\d+(\.\d+)?$/;
            if(regPos.test(val)){
              return true;
            }else{
              return false;
            }
          }
          if (!isNumber(value)) {
            callback(new Error('商品价格必须为正整数且不能含有空格'));
            this.flag2=true;
          }
          else if(value.indexOf(" ")>0){
            callback(new Error('输入不能有空格'))
            this.flag2=true
          }
          else
            this.flag2=false;
        };

        return {
          product: {
            pname: '',
            pdiscription: '',
            pcategoryid:'',
            ppicture:'',
            pprice:'',
          },
          flag1:true,
          flag2:true,
          flag3:true,
          categories:{},
          fileList:[],
          ruleForm:'',
          imageUrl:'',
          facepicUrlShow:'',
          flag:0,
          rules: {
            pname:[
              {validator: validatePname, trigger: 'blur'},
            ],
            pprice:[
              {validator: validatePprice, trigger: 'blur'},
            ],

          },
        }
      },
      methods:{
        getCategories(){
          this.$axios
            .get('/getAllCategories')
            .then(successResponse => {
              this.categories =successResponse.data
            })
            .catch(failResponse => {})
        },



        onsubmit(){

          this.$axios
            .post('/addProduct',{
              pname:this.product.pname,
              pdiscription: this.product.pdiscription,
              pcategoryid : this.product.pcategoryid,
              pprice: this.product.pprice,
              ppicture:this.imageUrl
            })
          this.product={};
          this.imageUrl='';
          this.$router.replace({name:"Home"});
        },
        handleRemove(file, fileList) {
          console.log(file, fileList);
        },
        handlePreview(file) {
          console.log(file);
        },

        uploadSuccess(response, file, fileList) {
          this.imageUrl=response;
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
          this.facepicUrlShow = file.name;
        },

      },
      mounted() {
        this.getCategories();
      },


    }
</script>

<style scoped>

</style>
