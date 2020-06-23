<template>
  <div>
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
    </el-table>
  </div>
</template>

<script>
    export default {
        name: "MyOrder",
      data(){
          return {
            order: [],
            buyer:{},
          }
      },
      methods:{
        getOrder() {
          this.$axios
            .post('/buyersOrder',{
              buyerid:this.buyer.id,
              oid:''
            })
            .then(successResponse => {
              this.order = successResponse.data
            })
            .catch(failResponse => {
            })
        },
        getBuyerID(){
          this.$axios
            .get('/getUser')
            .then(successResponse => {
              this.buyer = successResponse.data;
              this.getOrder();
            })
            .catch(failResponse => {
            })
        },
      },
      mounted() {
          this.getBuyerID();
      }
    }
</script>

<style scoped>

</style>
