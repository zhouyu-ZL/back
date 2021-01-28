import api from './api'; // 导入接口域名列表
import http from './http'; // 导入http中创建的axios实例



export default {
  install(Vue) {
    Vue.prototype.$http = this
  },
//登陆接口
  login(params = '',header = '') {
    return http.post(api.login, params,header);
  },
  //首页数据
  home(params = '',) {
    return http.get(api.home+`?pageNum=${params.pageNum}`);
  },
  //退出数据
  exit(params = '',) {
    return http.post(api.exit,params);
  },
  top(params = '',) {
    return http.get(api.top+`?productId=${params.productId}&status=${params.status}`);
  },
  //查询数据
  search(params = '',) {
    return http.get(api.search+`?listType=search&pageNum=1&productId=${params.productId}`);
  },
  //查看数据
  examine(params = '',) {
    return http.get(api.examine+`?productId=${params.productId}`);
  }

}