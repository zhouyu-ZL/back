<template>
    
  <div>
    <div class="commodity">
      <h1>品类管理</h1>
      <el-button type="primary">添加品类</el-button>
    </div>
      
  </div>
</template>

<script>
export default {
  data() {
    return {};
  }, //方法

  methods: {}, //挂载后生命周期函数

  mounted() {},
};
</script>

<style lang="scss" scoped>
.commodity{
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 1260px;
  height: 50px;
  margin: 0 auto;
  border-bottom: 1px solid #ccc;
  h1{
    font-size: 25px;
  }
}
</style>