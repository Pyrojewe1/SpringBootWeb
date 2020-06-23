<template>
  <div>
    <span>
    {{product.pid}}
    </span>
    <span>
    {{product.pname}}
    </span>
    <span>
    {{product.pprice}}
    </span>


    <div>
    <span>
    <el-image
      style="width:300px; height: 300px"
      :src="product.ppicture"></el-image>
    </span>
  </div>
  <div>
    <span>

       <el-button v-if="product.buying===true"  disabled="true" style="color: red">已被拍下</el-button>
      <el-button v-else @click="dialogVisible = true">购买</el-button>
    </span>
  </div>

    <el-dialog
      title="提示"
      :visible.sync="dialogVisible"
      width="30%"
    >
      <span>物品为{{product.pname}}</span>
      <span>物品价格为{{product.pprice}}</span>
      <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button v-if="product.buying===true" type="primary" disabled="true">已被拍下</el-button>
    <el-button v-else type="primary" @click="createOder">确 定</el-button>

  </span>
    </el-dialog>


  </div>
</template>

<script>
    export default {
        name: "ProductDetail",

      data() {
        return {
          product: {},
          dialogVisible: false,
        }
      },
      mounted: function() {

        this.getProductByPid();
      },
          methods: {
          getProductByPid () {
            this.$axios
              .post('/getProduct',{
                pid:this.$route.params.pid,
                pname:""
              })
              .then(successResponse => {
                this.product =successResponse.data

              })
              .catch(failResponse => {})
          },
            createOder(){
              this.dialogVisible = false;
              this.$axios
                .post('/createOrder',{
                  oproductid:this.product.pid,
                  ototalprice:this.product.pprice,
                })
                .then(successResponse => {
                  this.product =successResponse.data

                })
                .catch(failResponse => {})
            }

        }


    }


</script>

<style scoped>

</style>
