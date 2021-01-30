<template>
    
  <div>
      
    <div class="commodity">
      <h1>商品管理--添加商品</h1>
    </div>

      
    <div class="commodity_box">
      <el-form label-width="80px" ref="form" :model="form">
        <el-form-item label="商品名称">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="商品描述">
          <el-input v-model="form.subtitle"></el-input>
        </el-form-item>
        <el-form-item label="所属分类" class="falt">
          <div class="let">
            <el-select
              v-model="form.shopid"
              placeholder="请选择"
              @change="change"
            >
              <el-option
                v-for="item in arr"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              >
              </el-option>
            </el-select>
            <el-select
              v-model="form.pageid"
              placeholder="请选择"
              v-if="form.shopid"
            >
              <el-option
                v-for="item in page"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              >
              </el-option>
            </el-select>
          </div>
        </el-form-item>
        <el-form-item label="商品价格">
          <el-input v-model="form.price">
            <template #append>元</template>
          </el-input>
        </el-form-item>
        <el-form-item label="商品库存">
          <el-input v-model="form.stock">
            <template #append>件</template>
          </el-input>
        </el-form-item>
        <el-form-item label="商品图片" v-model="form.img"> </el-form-item>
        <el-form-item label="商品详情">
          <div id="edit"></div>
        </el-form-item>
      </el-form>
      <el-button type="primary" @click="submit">提交</el-button>
    </div>
  </div>
</template>

<script>
import E from "wangeditor";
export default {
  data() {
    return {
      list: [],
      arr: [],
      page: [],
      form: {
        name: "",
        subtitle: "",
        pageid: "",
        shopid: "",
        price: "",
        stock: "",
        img: "",
        detail: "",
      },
    };
  }, //方法

  methods: {
    change() {
      console.log(this.form.subtitle);
      console.log(this.form.shopid);
      this.listpage(1);
    },
    submit() {
      let params = {
        categoryId: this.form.shopid,
        name: this.form.name,
        subtitle: this.form.subtitle,
        subImages: "",
        detail: "",
        price: this.form.price,
        stock: this.form.stock,
        status: 1,
      };
      this.$http
        .submit(params)
        .then((result) => {
          console.log(result);

          if (result.status == 0) {
            this.$router.push("/commodity");
            this.$message.success(res.data);

            console.log(tykkhjghfg);
          } else {
            this.$message.error(res.data);
          }
        })
        .catch((err) => {});
    },
    listpage(type) {
      let params = {
        categoryId: this.form.shopid || 0,
      };
      this.$http
        .list(params)
        .then((result) => {
          console.log(result);
          if (type == 0) {
            this.arr = result.data;
          } else {
            this.form.pageid = "";
            this.page = result.data;
          }
        })
        .catch((err) => {});
    },
  }, //挂载后生命周期函数

  mounted() {
    // this.submit();
    const editor = new E("#edit");
    editor.create();
    this.listpage(0);
  },
};
</script>
<style lang="scss" scoped>
#edit {
  width: 1100px;
}
.let {
  display: flex;
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
.commodity_box {
  width: 400px;
  height: 500px;
  // background: aqua;
  margin: 20px 0 0 130px;
}
</style>