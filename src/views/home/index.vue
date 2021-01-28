<template>
  <div class="index">
    <div class="commodity"> <h1>Home</h1></div>
    <p>Welcome</p>
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
.index {
  padding: 20px 0 0 20px;
  p{
    padding-top: 20px;
  }
}
.commodity{
  width: 1300px;
  height: 50px;
  margin: 0 auto;
  // background: chartreuse;
  border-bottom: 1px solid #ccc;
  h1{
    font-size: 25px;
  }
}
</style>