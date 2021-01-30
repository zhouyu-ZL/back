<template>
    
  <div>
    <div class="commodity">
      <h1>品类管理</h1>
      <el-button type="primary" @click="add">添加品类</el-button>
    </div>
    <p class="commodity_center">当前商品分类ID：0</p>
      
    <el-table :data="tableData" border style="width: 1250px" class="tab" stripe>
      <el-table-column prop="id" label="品类ID" width="180"> </el-table-column>
      <el-table-column prop="name" label="品类名称" width="550"> </el-table-column>
      <el-table-column prop="address" label="操作"> 
        <template scope="scope">
          <div>
            <el-button class="btn">修改名称</el-button>
            <el-button class="btn">查看其子品类</el-button>
          </div>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableData:[],
    };
  }, //方法

  methods: {
    add(){
      this.$router.push('/add')
    }
  }, //挂载后生命周期函数

  mounted() {
    this.$http.list().then((result) => {
      console.log(result);
      this.tableData=result.data
    }).catch((err) => {
      
    });
  },
};
</script>

<style lang="scss" scoped>
.btn{
  color: #337AB7;
  border: none;
  background: none;
}
.tab{
  margin: 20px auto 0;
}
.commodity {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 1260px;
  height: 50px;
  margin: 0 auto;
  border-bottom: 1px solid #ccc;
  h1 {
    font-size: 25px;
  }
}
.commodity_center {
  padding: 20px 0 0 40px;
}
</style>