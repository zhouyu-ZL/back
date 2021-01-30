<template>
    
  <div>
    <div class="commodity">
      <h1>品类管理--添加品类</h1>
    </div>

    <el-form ref="form" :model="form" label-width="80px" class="form">
      <el-form-item label="所属品类">
        <el-select v-model="form.region" placeholder="/所有">
          <el-option
            :label="item.name"
            :value="item.id"
            v-for="item in list"
            :key="item.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="品类名称">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
    </el-form>
    <el-button type="primary" class="btn" @click="submit">提交</el-button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        name: "",
        region: "/所有",
      },
      list: [],
    };
  }, //方法

  methods: {
    submit() {
      let params = {
        parentId: list.id,
        categoryName: this.form.name,
      };
      this.$http.add().then((result) => {
        console.log(result);
      }).catch((err) => {
        
      });
    },
  }, //挂载后生命周期函数

  mounted() {
    this.$http
      .list()
      .then((result) => {
        console.log(result);
        this.list = result.data;
      })
      .catch((err) => {});
  },
};
</script>

<style lang="scss" scoped>
.btn {
  margin-left: 210px;
}
.form {
  width: 400px;
  margin: 20px 0 0 130px;
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
</style>