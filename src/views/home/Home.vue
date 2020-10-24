<template>
  <div id="home">
    <NavBar class="home_nav">
      <template v-slot:center>
        <div>购物街</div>
      </template>
    </NavBar>
    <HomeSwiper :banners="banners" />
    <HomeRecommend :recommends="recommends" />
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar";
import HomeSwiper from "./childComps/HomeSwiper";
import HomeRecommend from "./childComps/HomeRecommend";

import { getHomeMultiData } from "network/home";

export default {
  name: "Home",
  components: {
    NavBar,
    HomeSwiper,
    HomeRecommend,
  },
  data() {
    return {
      banners: [],
      recommends: [],
    };
  },
  created() {
    //1.请求首页数据
    getHomeMultiData().then((res) => {
      console.log(res);
      this.banners = res.data.banner.list;
      this.recommends = res.data.recommend.list;
    });
  },
};
</script>

<style>
.home_nav {
  background-color: var(--color-tint);
  color: #fff;
}
</style>