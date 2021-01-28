import axios from "axios";
import { Message, Loading } from "element-ui";
import { baseUrl } from "@/config";
import store from "@/store";
import QS from "qs";

console.log(baseUrl);

const request = axios.create({
  baseURL: '/api', //设置请求的base url
  timeout: 40000, //超时时长
});

//loading对象
let loading;

//当前正在请求的数量
let needLoadingRequestCount = 0;

//显示loading
function showLoading(target) {
  // 后面这个判断很重要，因为关闭时加了抖动，此时loading对象可能还存在，
  // 但needLoadingRequestCount已经变成0.避免这种情况下会重新创建个loading
  if (needLoadingRequestCount === 0 && !loading) {
    loading = Loading.service({
      lock: true,
      text: "Loading",
      spinner: "el-icon-loading",
      background: "rgba(0, 0, 0, 0.7)",
      target: target || "body",
    });
  }
  needLoadingRequestCount++;
}

//隐藏loading
function hideLoading() {
  needLoadingRequestCount--;
  needLoadingRequestCount = Math.max(needLoadingRequestCount, 0); //做个保护
  if (needLoadingRequestCount === 0) {
    //关闭loading
    toHideLoading();
  }
}

//防抖：将 300ms 间隔内的关闭 loading 便合并为一次。防止连续请求时， loading闪烁的问题。
let toHideLoading = () => {
  loading.close();
  loading = null;
};

//添加请求拦截器
request.interceptors.request.use(
  (config) => {
    //判断当前请求是否设置了不显示Loading
    if (config.headers.showLoading !== false) {
      showLoading(config.headers.loadingTarget);
    }
    if (store.state.token || localStorage.getItem("token")) {
      const token = store.state.token || localStorage.getItem("token");
      token && (config.headers.authorization = "Bearer " + token);
    }
    return config;
  },
  (err) => {
    //判断当前请求是否设置了不显示Loading
    if (config.headers.showLoading !== false) {
      hideLoading();
    }
    Message.error("请求超时!");
    return Promise.resolve(err);
  }
);

//响应拦截器
request.interceptors.response.use(
  (response) => {
    //判断当前请求是否设置了不显示Loading（不显示自然无需隐藏）
    if (response.config.headers.showLoading !== false) {
      hideLoading();
    }
    if (response.status == 200) {
      return Promise.resolve(response);
    } else {
      Message.error(response.message);
      return Promise.reject(response);
    }
  },
  (error) => {
    //判断当前请求是否设置了不显示Loading（不显示自然无需隐藏）
    if (error.config.headers.showLoading !== false) {
      hideLoading();
    }
    if (error.response && error.response.data && error.response.data.message) {
      var jsonObj = JSON.parse(error.response.data.message);
      Message.error(jsonObj.message);
    } else {
      Message.error(error.message);
    }
    return Promise.reject(error);
  }
);

export default {
  /**
   * get方法，对应get请求
   * @param {String} url [请求的url地址]
   * @param {Object} params [请求时携带的参数]
   */
  get(url, data, header) {
    if (header) {
      request.defaults.headers.showLoading = header.showLoading;
      request.defaults.headers.loadingTarget = header.loadingTarget;
    }

    let params = data || "";
    return new Promise((resolve, reject) => {
      request
        .get(url, params)
        .then((res) => {
          resolve(res.data);
        })
        .catch((err) => {
          reject(err.data);
        });
    });
  },

  /**
   * post方法，对应post请求
   * @param {String} url [请求的url地址]
   * @param {Object} params [请求时携带的参数]
   */
  post(url, data, header) {
    if (header) {
      request.defaults.headers.showLoading = header.showLoading;
      request.defaults.headers.loadingTarget = header.loadingTarget;
    }

    let params = data || "";
    return new Promise((resolve, reject) => {
      request
        .post(url, QS.stringify(params))
        .then((res) => {
          resolve(res.data);
        })
        .catch((err) => {
          reject(err.data);
        });
    });
  },
  /**
   * upload方法，对应upload请求
   * @param {String} url [请求的url地址]
   * @param {Object} params [请求时携带的参数]
   */
  upload(url, data, header) {
    if (header) {
      request.defaults.headers.showLoading = header.showLoading;
      request.defaults.headers.loadingTarget = header.loadingTarget;
    }

    let params = data || "";
    return new Promise((resolve, reject) => {
      request
        .upload(url, params)
        .then((res) => {
          resolve(res.data);
        })
        .catch((err) => {
          reject(err.data);
        });
    });
  },

  /**
   * download方法，对应download请求
   * @param {String} url [请求的url地址]
   * @param {Object} params [请求时携带的参数]
   */
  download(url, data, header) {
    if (header) {
      request.defaults.headers.showLoading = header.showLoading;
      request.defaults.headers.loadingTarget = header.loadingTarget;
    }

    let params = data || "";
    return new Promise((resolve, reject) => {
      request
        .download(url, params)
        .then((res) => {
          resolve(res.data);
        })
        .catch((err) => {
          reject(err.data);
        });
    });
  },
  /**
   * put方法，对应put请求
   * @param {String} url [请求的url地址]
   * @param {Object} params [请求时携带的参数]
   */
  put(url, data, header) {
    if (header) {
      request.defaults.headers.showLoading = header.showLoading;
      request.defaults.headers.loadingTarget = header.loadingTarget;
    }

    let params = data || "";
    return new Promise((resolve, reject) => {
      request
        .put(url, params)
        .then((res) => {
          resolve(res.data);
        })
        .catch((err) => {
          reject(err.data);
        });
    });
  },
  /**
   * delete方法，对应delete请求
   * @param {String} url [请求的url地址]
   * @param {Object} params [请求时携带的参数]
   */
  delete(url, data, header) {
    if (header) {
      request.defaults.headers.showLoading = header.showLoading;
      request.defaults.headers.loadingTarget = header.loadingTarget;
    }

    let params = data || "";
    return new Promise((resolve, reject) => {
      request
        .delete(url, params)
        .then((res) => {
          resolve(res.data);
        })
        .catch((err) => {
          reject(err.data);
        });
    });
  },
};
