<template>
  <div>
  <el-menu
    :default-active="activeIndex2"
    class="el-menu-demo"
    mode="horizontal"
    background-color="#545c64"
    text-color="#fff"
    active-text-color="#ffd04b">
    <el-menu-item index="1" @click="visible1Do">审核商品</el-menu-item>
    <el-menu-item index="2" @click="visible2Do">审核订单</el-menu-item>
    <el-menu-item index="3"><a href="https://www.ele.me" target="_blank">订单管理</a></el-menu-item>
    <div v-if="visible1">
      <el-table
          :data="products"
          border
          style="width: 100%">
          <el-table-column
            prop="pid"
            label="商品id"
            width="180">
        </el-table-column>
        <el-table-column
          prop="pname"
          label="商品名称"
          width="180">
        </el-table-column>
        <el-table-column
          prop="pprice"
          label="商品价格">
        </el-table-column>
        <el-table-column
          prop="pdiscription"
          label="商品描述">
        </el-table-column>
        <el-table-column
          prop="publisherid"
          label="发布者">
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button @click="lookDetail(scope.$index,scope.row)">通过审核</el-button>
          </template>

        </el-table-column>



      </el-table>
      <el-dialog
        title="提示"
        :visible.sync="dialogVisible"
        width="30%"
        :before-close="handleClose">
        <span>商品id是：{{Pid}}<br></span>
        <span>商品名是：{{Pname}}<br></span>
        <span>商品价格：{{Pprice}}<br></span>
        <span>卖家id：{{Ppublisher}}<br></span>
        <el-image
          style="width:300px; height: 200px"
          :src="Ppicture">

        </el-image>
        <span slot="footer" class="dialog-footer">
    <el-button @click="handleClose">取 消</el-button>
    <el-button type="primary" @click="changeProduct">审核通过</el-button>
  </span>
      </el-dialog>


    </div>
    <div v-if="visible2">
      <el-table
        :data="order"
        border
        style="width: 100%">
        <el-table-column
          prop="oid"
          label="订单id"
          width="180">
        </el-table-column>
        <el-table-column
          prop="oproductid"
          label="商品id"
          width="180">
        </el-table-column>
        <el-table-column
          prop="ototalprice"
          label="商品价格">
        </el-table-column>
        <el-table-column
          prop="ostarttime"
          label="下单时间">
        </el-table-column>
        <el-table-column
          prop="oaddressee"
          label="收件人">
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button @click="lookDetail2(scope.$index,scope.row)">通过审核</el-button>
          </template>
        </el-table-column>
      </el-table>

      <el-dialog
        title="提示"
        :visible.sync="dialogVisible"
        width="30%"
        :before-close="handleClose">
        <span>商品id是：{{Pid}}<br></span>
        <span>商品名是：{{Pname}}<br></span>
        <span>商品价格：{{Pprice}}<br></span>
        <span>卖家id：{{Ppublisher}}<br></span>
        <el-image
          style="width:300px; height: 200px"
          :src="Ppicture">

        </el-image>
        <span slot="footer" class="dialog-footer">
    <el-button @click="handleClose">取 消</el-button>
    <el-button type="primary" @click="changeProduct">审核通过</el-button>
  </span>
      </el-dialog>


      <el-dialog
        title="提示"
        :visible.sync="dialogVisible2"
        width="30%"
        :before-close="handleClose2">
        <span>商品id是：{{tempOrder.oproductid}}<br></span>
        <span>商品价格：{{tempOrder.ototalprice}}<br></span>
        <el-image
          style="width:300px; height: 200px"
          :src="Ppicture">

        </el-image>
        <span slot="footer" class="dialog-footer">
    <el-button @click="handleClose2">取 消</el-button>
    <el-button type="primary" @click="changeOrder">审核通过</el-button>
  </span>
      </el-dialog>

    </div>

  </el-menu>
  </div>

</template>

<script>
    export default {
        name: "AdminHome",
      data(){
          return{
            visible1:true,
            visible2:false,
            activeIndex: '1',
            activeIndex2: '1',
            products:[],
            dialogVisible:false,
            Pid:'',
            Pname:'',
            Pprice:'',
            Ppicture:'',
            Ppublisher:'',
            responseResult:'',
            order:[],
            visible3:false,
            dialogVisible2:false,
            tempOrder:[],
            index1:'',
          }
      },
      methods: {
        getProducts() {
          this.$axios
            .get('/getCheckProduct')
            .then(successResponse => {
              this.products = successResponse.data
            })
            .catch(failResponse => {
            })
        },
        getCheckOrder() {
          this.$axios
            .get('/getCheckOrder')
            .then(successResponse => {
              this.order = successResponse.data
            })
            .catch(failResponse => {
            })
        },

        lookDetail(index, row) {
          // console.log(index);
          // console.log(row.id);
          this.dialogVisible = true;
          this.Pid = row.pid;
          this.Pname = row.pname;
          this.Pprice = row.pprice;
          this.Ppicture = row.ppicture;
          this.Ppublisher = row.publisherid;
          this.index1=index;
        },

        lookDetail2(index, row) {
          // console.log(index);
          // console.log(row.id);
          this.dialogVisible2 = true;
          this.tempOrder=row;
          this.index1=index;

        },


        changeProduct() {
          this.dialogVisible = false;
          this.$axios
            .post('/changeProduct', {
              pid: this.Pid,
              pname: ''
            })
            .then(successResponse => {
              this.responseResult = JSON.stringify(successResponse.data);
              if (this.responseResult > 0) {
                alert("修改成功");
              } else alert("修改失败");
            });
          this.Pid = '';
          this.Pname = '';
          this.Pprice = '';
          this.Ppicture = '';
          this.Ppublisher = '';
          this.products.splice(this.index1, 1);
          this.index1='';
        },


        changeOrder() {
          this.dialogVisible2 = false;
          this.$axios
            .post('/changeOrder', {
              oid: this.tempOrder.oid,
              buyerid: ''
            })
            .then(successResponse => {
              this.responseResult = JSON.stringify(successResponse.data);
              if (this.responseResult > 0) {
                alert("修改成功");
              } else alert("修改失败");
            });
            this.tempOrder='';
            this.order.splice(this.index1,1);
            this.index1='';


        },


        handleClose() {
          this.dialogVisible = false;
          this.Pid = '';
          this.Pname = '';
          this.Pprice = '';
          this.Ppicture = '';
          this.Ppublisher = '';
          this.index1='';
        },
        handleClose2() {
          this.dialogVisible2 = false;
         this.tempOrder='';
         this.index1='';
        },

        visible1Do() {
        this.visible1 = true;
        this.visible2=false;
        this.visible3=false;
    },
        visible2Do() {
          this.visible2 = true;
          this.visible1=false;
          this.visible3=false;
        },
        visible3Do() {
          this.visible3 = true;
          this.visible1=false;
          this.visible2=false;
        }




      },
      mounted:function () {
        this.getProducts();
        this.getCheckOrder();
      }


    }
</script>

<style scoped>

</style>
