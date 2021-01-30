<template>
    
  <div>
    <div class="commodity_wrap">
      <div class="commodity">
        <h1>商品管理</h1>
      </div>
      <div class="commodity_top">
        <el-form ref="form" :model="form" class="form">
          <el-form-item>
            <el-select
              v-model="form.region"
              placeholder="按商品id查询"
              class="inp"
            >
              <el-option label="按订单号查询" v-model="form.id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-input placeholder="订单号"></el-input>
          </el-form-item>
          <el-button type="primary" class="btn" @click="search">查询</el-button>
        </el-form>

        <el-table :data="tableData" border style="width: 100%" stripe>
          <el-table-column prop="orderNo" label="订单号" width="220">
          </el-table-column>
          <el-table-column prop="receiverName" label="收件人" width="180">
          </el-table-column>
          <el-table-column prop="statusDesc" label="订单状态" width="180">
          </el-table-column>
          <el-table-column label="订单总价" width="180">
            <template scope="scope">
              <div>
                ￥{{ scope.row.payment }}
              </div>
            </template>
          </el-table-column>
          <el-table-column label="创建时间" width="350" prop="createTime">
          </el-table-column>
          <el-table-column prop="address" label="操作">
            <template scope="scope">
              <div>
                <el-button size="small" @click="examine(scope.row.orderNo)"
                  >查看</el-button
                >
              </div>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="pagenum"
          :page-size="pagesize"
          layout="total, prev, pager, next, jumper"
          :total="total"
        >
        </el-pagination>
      </div>
    </div>
      
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        name: "",
        region: "",
        id: "",
      },
      
      total: 0,
      pagenum: 1,
      pagesize: 5,
      tableData: [],
      name: "",
    };
  }, //方法

  methods: {
    handleSizeChange(val) {
      this.pagesize = val;
    },
    handleCurrentChange(val) {
      this.pagenum = val;
      console.log(this.pagenum);
      this.list();
    },
    list() {
      let params = {
        pageNum: this.pagenum,
      };
      this.$http
        .order(params)
        .then((result) => {
          console.log(result);
          this.tableData = result.data.list;
          this.total = result.data.total;
        })
        .catch((err) => {});
    },
    search() {
      console.log(this.id);
      let params = {
        productId: this.form.region,
        productName:this.form.id
      };
      this.$http
        .search(params)
        .then((result) => {
        })
        .catch((err) => {});
    },
    examine(id) {
      this.$router.push({ path: "/detail", query: { id: id } });
    },
  }, //挂载后生命周期函数

  mounted() {
    this.list();
  },
};
</script>

<style lang="scss" scoped>
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
.bottom_btn {
  background: #f0ad4e;
  color: #fff;
  padding: 2px;
  margin-left: 5px;
}
.btn {
  width: 100px;
  height: 40px;
  margin-left: 10px;
}
.form {
  display: flex;
}
.inp {
  width: 160px;
  margin-right: 20px;
}
.commodity_wrap {
  width: 1300px;
  height: 850px;
  // background: aquamarine;
  margin: 0 auto;
  .commodity_top {
    width: 100%;
    height: 60px;
    // background: chartreuse;
    margin-top: 20px;
  }
}
</style>