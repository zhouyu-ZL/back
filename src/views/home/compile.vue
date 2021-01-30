<template>
    
  <div>
      
    <div class="commodity">
      <h1>商品管理--修改商品</h1>
    </div>
      
    <div class="commodity_box">
      <el-form label-width="80px">
        <el-form-item label="商品名称">
          <el-input v-model="list.name"></el-input>
        </el-form-item>
        <el-form-item label="商品描述">
          <el-input v-model="list.subtitle"></el-input>
        </el-form-item>
        <el-form-item label="所属分类" class="falt">
          <div class="let">
            <el-select v-model="shopid" clearable placeholder="请选择">
              <el-option
                v-for="item in arr"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              
              >
              </el-option>
            </el-select>
            <el-select v-model="pageid" clearable placeholder="请选择">
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
          <el-input v-model="list.price">
            <template #append>元</template>
          </el-input>
        </el-form-item>
        <el-form-item label="商品库存">
          <el-input v-model="list.stock">
            <template #append>件</template>
          </el-input>
        </el-form-item>
        <el-form-item label="商品图片">
          <el-upload
            action="http://admintest.happymmall.com/manage/product/upload.do"
            list-type="picture-card"
            :on-preview="handlePictureCardPreview"
            :on-remove="handleRemove"
          >
            <i class="el-icon-plus"></i>
          </el-upload>
          <el-dialog :visible.sync="dialogVisible" size="tiny">
            <img width="100%" :src="dialogImageUrl" alt="" />
          </el-dialog>
        </el-form-item>
        <el-form-item label="商品详情">
          <div id="edit" v-html="list.detail">

          </div>
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
      pageid: "67891-09",
      shopid: "adm000111",
      list: [],
      arr: [],
      page: [],
      form: {
        name: "",
      },
      dialogVisible: false,
      dialogImageUrl: "",
    };
  }, //方法

  methods: {
    arrss(id){
      console.log(id);
    },
    handleRemove(file) {
      let fromData = new FormData();
      // console.log(file);
      fromData.append("file", file.file);
      this.$http.img(fromData).then((result) => {
        console.log(result);
      }).catch((err) => {
        
      });
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    submit() {
      console.log(this.shopid);
      let params = {
        categoryId: this.shopid,
        name: this.list.name,
        subImages: "",
        detail: this.list.detail,
        price: this.list.price,
        stock: this.list.stock,
        status: this.list.status,
        id: this.$route.query.id,
      };
      this.$http
        .submit(params)
        .then((result) => {
          console.log(result);
          this.$router.push('/commodity')
        })
        .catch((err) => {});
    },
  }, //挂载后生命周期函数

  mounted() {
    const editor = new E("#edit");
    editor.create();
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
        // console.log(this.arr);
      })
      .catch((err) => {});

    this.$http
      .listS()
      .then((result) => {
        console.log(result);
        this.page = result.data;
        console.log(this.page);
      })
      .catch((err) => {});
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