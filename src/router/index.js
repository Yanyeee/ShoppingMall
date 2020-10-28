import Vue from "vue"
import VueRouter from "vue-router"

const Home = () => import("views/home/Home")
const Category = () => import("views/category/Category")
const Cart = () => import("views/cart/Cart")
const Profile = () => import("views/profile/Profile")

//1.安装插件
Vue.use(VueRouter)

//2.创建路由对象 & 建立映射关系
const routes = [{
    path: '',
    redirect: '/home'
  },
  {
    path: '/home',
    component: Home
  }, {
    path: '/category',
    component: Category
  }, {
    path: '/cart',
    component: Cart
  }, {
    path: '/profile',
    component: Profile
  },
]
const router = new VueRouter({
  routes,
  mode: "history"
})

router.onError((error) => {
  const pattern = /Loading chunk (\d)+ failed/g;
  const isChunkLoadFailed = error.message.match(pattern);
  const targetPath = router.history.pending.fullPath;
  if (isChunkLoadFailed) {
    router.replace(targetPath);
  }
});

//3.导出
export default router
