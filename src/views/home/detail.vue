<template>
    
  <div>
    <div class="commodity">
      <h1>订单详情</h1>
    </div>
      
    <div class="commodity_center">
      <ul>
        <li>
          <h4>订单号</h4>
          ：<span>{{ list.orderNo }}</span>
        </li>
        <li>
          <h4>创建时间</h4>
          ：<span>{{ list.createTime }}</span>
        </li>
        <li>
          <h4>收件人</h4>
          ：<span>{{
            arr.receiverName +
            "," +
            arr.receiverProvince +
            "," +
            arr.receiverCity +
            "," +
            arr.receiverAddress
          }}</span>
        </li>
        <li>
          <h4>订单状态</h4>
          ：<span>{{ list.statusDesc }}</span>
        </li>
        <li>
          <h4>支付方式</h4>
          ：<span>{{ list.paymentTypeDesc }}</span>
        </li>
        <li>
          <h4>订单金额</h4>
          ：<span>{{ list.payment }}</span>
        </li>
      </ul>
    </div>
    <el-table :data="tableData" border style="width: 1250px" class="tab">
      <el-table-column label="商品图片" width="180">
        <template scope="scope">
          <div>
            <img :src="`http://img.happymmall.com/`+scope.row.productImage" class="img"/>
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="productName" label="商品信息" width="180">
      </el-table-column>
      <el-table-column label="单价">
        <template scope="scope">
          <div>￥{{ scope.row.totalPrice }}</div>
        </template>
      </el-table-column>
      <el-table-column prop="quantity" label="数量"> </el-table-column>
      <el-table-column label="合计">
        <template scope="scope">
          <div>￥{{ scope.row.totalPrice }}</div>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      list: [],
      arr: [],
      tableData: [],
    };
  }, //方法

  methods: {}, //挂载后生命周期函数

  mounted() {
    let params = {
      orderNo: this.$route.query.id,
    };
    this.$http
      .detail(params)
      .then((result) => {
        // console.log(result);
        this.list = result.data;
        this.arr = result.data.shippingVo;
        this.tableData = result.data.orderItemVoList;
        console.log(this.tableData);
      })
      .catch((err) => {});
  },
};
</script>

<style lang="scss" scoped>
.img{
  width: 80px;
  height: 80px;
}
.tab {
  margin: 30px auto 0;
}
.commodity {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 1260px;
  height: 50px;
  margin: 0 auto;
  // background: chartreuse;
  border-bottom: 1px solid #ccc;
  h1 {
    font-size: 25px;
  }
}
.commodity_center {
  width: 1100px;
  height: 250px;
  // background: aquamarine;
  margin: 0 auto;
  ul {
    width: 100%;
    height: 100%;
    li {
      display: flex;
      padding-top: 20px;
    }
  }
}
</style>