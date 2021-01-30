import api from "./api"; // 导入接口域名列表
import http from "./http"; // 导入http中创建的axios实例

export default {
  install(Vue) {
    Vue.prototype.$http = this;
  },
  //登陆接口
  login(params = "", header = "") {
    return http.post(api.login, params, header);
  },
  //首页数据
  home(params = "") {
    return http.get(api.home + `?pageNum=${params.pageNum}`);
  },
  //退出数据
  exit(params = "") {
    return http.post(api.exit, params);
  },
  top(params = "") {
    return http.get(
      api.top + `?productId=${params.productId}&status=${params.status}`
    );
  },
  //查询数据
  search(params = "") {
    return http.get(
      api.search + `?listType=search&pageNum=1&productId=${params.productId}`
    );
  },
  //查看数据
  examine(params = "") {
    return http.get(api.examine + `?productId=${params.productId}`);
  },
  list(params = "") {
    return http.get(api.list + `?categoryId=${params.categoryId}`);
  },
  //详情
  submit(params = "") {
    return http.get(
      api.submit +
        `?categoryId=${params.categoryId}&name=${params.name}&subtitle=${params.subtitle}&subImages=${params.subImages}&detail=${params.detail}&price=${params.price}&stock=${params.stock}&status=${params.status}`
    );
  },
  //品类管理添加
  add(params = "") {
    return http.get(
      api.add +
        `?parentId=${params.parentId}&categoryName=${params.categoryName}`
    );
  },
  //订单管理
  order(params = "") {
    return http.get(api.order + `?pageNum=${params.pageNum}`);
  },
  //订单管理详情
  detail(params = "") {
    return http.get(api.detail + `?orderNo=${params.orderNo}`);
  },
  //上传图片
  img(params = "") {
    return http.post(api.img, params);
  },
  //查询
  search(params = "") {
    let searchType =""
    let searchData =""
    if(params.productId){
      searchType= 'productId'
      searchData =params.productId
    }else{
      searchType='productName'
      searchData =params.productName
    }
    return http.get(api.search+`?listType=search&pageNum=1&${searchType}=${searchData}`);
  },
  //商品管理添加
  addList(params = "") {
    return http.get(api.addList, params);
  },
};
