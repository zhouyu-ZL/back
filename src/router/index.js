import Vue from "vue";
import VueRouter from "vue-router";
//解决避免对当前位置的冗余导航问题
const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch((err) => err);
};

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    redirect: "/index",
  },
  {
    path: "/home",
    name: "home",
    component: () => import("../views/home.vue"),
    children: [
      {
        path: "/index",
        name: "index",
        component: () => import("../views/home/index.vue"),
      },
      {
        path: "/category",
        name: "category",
        component: () => import("../views/home/category.vue"),

      },
      {
        path: "/commodity",
        name: "commodity",
        component: () => import("../views/home/commodity.vue"),
      },
      {
        path: "/order",
        name: "order",
        component: () => import("../views/home/order.vue"),

      },
    ],
  },
  {
    path: "/login",
    name: "login",
    component: () => import("../views/login.vue"),
  },
];

const router = new VueRouter({
  routes,
});

export default router;
