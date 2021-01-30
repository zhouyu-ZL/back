<template>
    
  <div>
    <div class="commodity">
      <h1>商品详情</h1>
    </div>
      
    <div class="commodity_box">
      <el-form ref="form" label-width="80px">
        <el-form-item label="商品名称">
          <span>{{ list.name }}</span>
        </el-form-item>
        <el-form-item label="商品描述">
          <span>{{ list.subtitle }}</span>
        </el-form-item>
        <el-form-item label="当前状态">
          <span>{{ list.status == 2 ? "在售" : "已下架" }}</span>
        </el-form-item>
        <el-form-item label="所属分类">
          <el-select>
            <el-option
              :label="item.name"
              :value="item.id"
              v-for="item in arr"
              :key="item.id"
            ></el-option>
          </el-select>

          <el-select>
            <el-option
              :label="item.name"
              :value="item.id"
              v-for="item in page"
              :key="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="商品价格">
          <el-input v-model="list.price" disabled>
            <template #append>元</template>
          </el-input>
        </el-form-item>
        <el-form-item label="商品库存">
          <el-input v-model="list.stock" disabled>
            <template #append>件</template>
          </el-input>
        </el-form-item>
        <el-form-item label="商品图片">
          <img :src="list.subImages">
        </el-form-item>
        <el-form-item label="商品详情">
          <span v-html="list.detail"></span>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      list: [],
      arr: [],
      page: [],
      form: "",
    };
  }, //方法

  methods: {}, //挂载后生命周期函数

  mounted() {
    let params = {
      productId: this.$route.query.id,
    };
    this.$http
      .examine(params)
      .then((result) => {
        console.log(result);
        this.list = result.data;
      })
      .catch((err) => {});

    this.$http
      .list()
      .then((result) => {
        console.log(result);
        this.arr = result.data;
      })
      .catch((err) => {});

    this.$http
      .listS()
      .then((result) => {
        console.log(result);
        this.page = result.data;
      })
      .catch((err) => {});
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
.commodity_box {
  width: 1050px;
  height: 500px;
  // background: aqua;
  margin: 0 auto 0;
  display: flex;
}
</style>