<template>
    
  <div>
    <div class="commodity_wrap">
      <div class="commodity">
        <h1>商品管理</h1>
        <el-button type="primary" @click="add">添加商品</el-button>
      </div>
      <div class="commodity_top">
        <el-form ref="form" class="form">
          <el-form-item>
            <el-select v-model="value" placeholder="请选择" class="inp">
              <el-option label="按商品id查询" value="productId"></el-option>
              <el-option label="按商品名称查询" value="productName"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-input v-model="search_data" placeholder="请输入内容"></el-input>
          </el-form-item>
          <el-button type="primary" class="btn" @click="search">查询</el-button>
        </el-form>

        <el-table :data="tableData" border style="width: 100%" stripe>
          <el-table-column prop="id" label="id" width="180"> </el-table-column>
          <el-table-column prop="name" label="信息" width="280">
            <template scope="scope">
              <div>
                {{ scope.row.name }}<br />
                {{ scope.row.subtitle }}
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="price" label="价格" width="250">
          </el-table-column>
          <el-table-column label="状态" width="250">
            <template scope="scope">
              <div>
                <span>{{ scope.row.status == 1 ? "在售" : "已下架" }}</span>
                <el-button class="bottom_btn" @click="top(scope.row)">
                  {{ scope.row.status == 1 ? "下架" : "上架" }}
                </el-button>
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="address" label="操作">
            <template scope="scope">
              <div>
                <el-button size="small" @click="examine(scope.row.id)"
                  >查看</el-button
                >
                <el-button size="small" @click="compile(scope.row.id)"
                  >编辑</el-button
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
      value: "",
      total: 0,
      pagenum: 1,
      pagesize: 5,
      tableData: [],
      name: "",
      search_data: "",
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
        .home(params)
        .then((result) => {
          // console.log(result);
          this.tableData = result.data.list;
          this.total = result.data.total;
        })
        .catch((err) => {});
    },
    //切换状态
    top(e) {
      let { id } = e;
      let { status } = e;
      status = status == 2 ? (status = 1) : (status = 2);
      let text;
      if (status == 1) {
        text = "确认要上架该商品吗？";
      } else {
        text = "确认要下架该商品吗？";
      }

      let params = {
        productId: id,
        status: status,
      };

      this.$confirm(text, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.$http
            .top(params)
            .then((res) => {
              // console.log(res);
              if (res.status == 0) {
                this.$message.success(res.data);
                this.list();
              } else {
                this.$message.error(res.data);
              }
            })
            .catch((err) => {
              // console.log(err);
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
      // console.log(e);
    },

    search() {
      console.log(this.value, this.search_data);
      let params = {};
      if (this.value == "productId") {
        params = {
          productId: this.search_data,
        };
      } else {
        params = {
          productName: this.search_data,
        };
      }
      this.$http
        .search(params)
        .then((result) => {
          console.log(result);
          this.tableData = result.data.list;
          this.total = result.data.total;
        })
        .catch((err) => {});
    },
    examine(id) {
      this.$router.push({ path: "/examine", query: { id: id } });
    },
    compile(id) {
      this.$router.push({ path: "/compile", query: { id: id } });
    },
    add() {
      this.$router.push("/addlist");
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