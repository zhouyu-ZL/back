<template>
  <div class="home">
    <el-container>
      <el-header>
        <div class="home_nav">
          <ul>
            <li>MMALL ADMIN</li>
            <li>欢迎，admin111222</li>
            <li><el-button type="primary" class="home_btn" @click="exit">退出</el-button></li>
          </ul>
        </div>
      </el-header>
      <el-container>
        <el-aside width="200px">
          <el-menu
            default-active="2"
            class="el-menu-vertical-demo"

            router
          >
            <el-menu-item index="index" class="home_color">
              <i class="el-icon-bell home_color"></i>
              <span slot="title">Home</span>
            </el-menu-item>
            <el-menu-item class="home_color">
              <i class="el-icon-tickets home_color"></i>
              <span slot="title">商品</span>
            </el-menu-item>
            <el-menu-item index="commodity" class="home_color">
              
              <span slot="title" class="bottom">商品管理</span>
            </el-menu-item>
            <el-menu-item index="category" class="home_color">
              
              <span slot="title" class="bottom">品类管理</span>
            </el-menu-item>
            <el-menu-item class="home_color">
              <i class="el-icon-time home_color"></i>
              <span slot="title">订单</span>
            </el-menu-item>
            <el-menu-item index="order" class="home_color">
              
              <span slot="title" class="bottom">订单管理</span>
            </el-menu-item>
          </el-menu>
        </el-aside>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>

export default {
  data() {
    return {};
  },

  methods: {
    exit(){
      this.$http.exit().then((result) => {
        console.log(result);
        this.$router.push('/login')
      }).catch((err) => {
        
      });
    }
  },

  mounted() {},
};
</script>
<style lang="scss" scoped>
* {
  margin: 0;
  padding: 0;
}
.home_nav {
  width: 100%;
  height: 50px;
  border-bottom: 1px solid #ccc;
  background: #f8f8f8;
  ul {
    width: 100%;
    height: 100%;
    display: flex;
    // align-items: center;
    // justify-content: center;

    li {
      // border: 1px solid red;
      line-height: 50px;
      &:nth-child(1) {
        width: 1300px;
        height: 100%;
        font-size: 18px;
        color: #6d6d6d;
        padding-left: 20px;
      }
      &:nth-child(2) {
        width: 100px;
        height: 100%;
      }
      &:nth-child(3) {
        width: 80px;
        height: 100%;
        text-align: center;
        color: #337ab7;
      }
      .home_btn {
        background: none;
        border: none;
        line-height: 50px;
        color: #338ECE;
      }
    }
  }
}
.home_color{
  color: #337ab7;
}
.bottom{
  padding-left: 40px;
}
.el-aside{
  height: 100%;
  background: chartreuse;
}
</style>
