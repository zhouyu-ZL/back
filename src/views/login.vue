<template>
    
  <div>
    <div class="login">
      <div class="login_top">请登录</div>
      <div class="login_center">
        <p class="login_one">
          <input type="text" placeholder="User Name" v-model="name" />
        </p>
        <p class="login_one">
          <input type="password" placeholder="Password" v-model="pass" />
        </p>
      </div>
      <el-button type="primary" class="btn" @click="submit">LOGIN</el-button>
    </div>
      
  </div>
</template>

<script>
export default {
  data() {
    return {
      name: "",
      pass: "",
    };
  }, //方法

  methods: {
    submit() {
      let params = {
        username: this.name,
        password: this.pass,
      };
      if (this.name == "" || this.pass == "") {
        this.$message.error("账号或密码不能为空");
      }else{
        this.$http
        .login(params)
        .then((result) => {
          console.log(result);
          this.name = "";
          this.pass = "";
          this.$router.push('/home')
        })
        .catch((err) => {});
      }
      
    },
  }, //挂载后生命周期函数

  mounted() {},
};
</script>

<style lang="scss" scoped>
.login {
  width: 450px;
  height: 210px;
  // background: aqua;
  border: 1px solid #ccc;
  margin: 150px auto 0;
  .login_top {
    width: 450px;
    height: 40px;
    background: #eee;
    line-height: 40px;
    padding-left: 20px;
    box-sizing: border-box;
  }
  .login_center {
    width: 450px;
    height: 120px;
    // background: chartreuse;
    overflow: hidden;
    .login_one {
      width: 100%;
      height: 40px;
      margin: 10px 0 0 0;
      // background: chocolate;

      input {
        border: 1px solid #ccc;
        background: white;
        width: 400px;
        height: 30px;
        margin: 5px 0 0 25px;
        text-indent: 1em;
      }
      input:hover {
        border: 1px solid rgb(15, 137, 238);
      }
    }
  }
}
.btn {
  width: 400px;
  margin-left: 25px;
}
</style>