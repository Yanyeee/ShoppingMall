<template>
  <div id="home" class="wrapper">
    <NavBar class="home_nav">
      <template v-slot:left>
        <div id="logo"></div>
      </template>
      <template v-slot:center>
        <input id="search" type="text" placeholder="牛仔裤" />
      </template>
    </NavBar>
    <Scroll
      class="content"
      ref="scroll"
      :robeType="3"
      @scroll="contentScroll"
      :pullUpLoad="true"
      @pullingUp="loadMore"
    >
      <HomeSwiper :banners="banners" />
      <HomeRecommend :recommends="recommends" />
      <TabControl
        class="tab_control"
        @tabClick="tabClick"
        :titles="['为您推荐', '热销爆款', '精选优品']"
      />
      <GoodsList :goods="showGoods" />
    </Scroll>
    <BackTop @click.native="backClick" v-show="isShowBackTop" />
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar";
import HomeSwiper from "./childComps/HomeSwiper";
import HomeRecommend from "./childComps/HomeRecommend";
import TabControl from "components/content/tabControl/TabControl";
import GoodsList from "components/content/goods/GoodsList";
import Scroll from "components/common/scroll/Scroll";
import BackTop from "components/content/backTop/BackTop";

import { getHomeMultiData, getHomeGoods } from "network/home";

export default {
  name: "Home",
  components: {
    NavBar,
    HomeSwiper,
    HomeRecommend,
    TabControl,
    GoodsList,
    Scroll,
    BackTop,
  },
  data() {
    return {
      banners: [],
      recommends: [],
      goods: {
        pop: { page: 0, list: [] },
        new: { page: 0, list: [] },
        sell: { page: 0, list: [] },
      },
      currentType: "pop",
      isShowBackTop: false,
    };
  },
  computed: {
    showGoods() {
      return this.goods[this.currentType].list;
    },
  },
  created() {
    //1.请求首页数据
    this.getHomeMultiData();
    //2.请求商品数据
    this.getHomeGoods("pop");
    this.getHomeGoods("new");
    this.getHomeGoods("sell");
  },
  methods: {
    //1.网络请求相关方法
    getHomeMultiData() {
      getHomeMultiData().then((res) => {
        this.banners = res.data.banner.list;
        this.recommends = res.data.recommend.list;
        console.log(res.data);
      });
    },
    getHomeGoods(type) {
      const page = this.goods[type].page + 1;
      getHomeGoods(type, page).then((res) => {
        this.goods[type].list.push(...res.data.list);
        this.goods[type].page += 1;
      });
    },

    //2.事件监听相关方法
    tabClick(index) {
      switch (index) {
        case 0:
          this.currentType = "pop";
          break;
        case 1:
          this.currentType = "new";
          break;
        case 2:
          this.currentType = "sell";
          break;
      }
    },
    backClick() {
      this.$refs.scroll.scrollTo(0, 0);
    },
    contentScroll(position) {
      this.isShowBackTop = -position.y > 800;
    },
    loadMore() {
      this.getHomeGoods(this.currentType);
    },
  },
};
</script>

<style scoped>
#home {
  /*padding-top: 44px;*/
  height: 100vh;
  position: relative;
}

.home_nav {
  background-color: #fff;
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  z-index: 9;
}

#logo {
  /* top: 5px; */
  width: 50px;
  height: 44px;
  background: url("~assets/img/home/favicon.png");
  background-repeat: no-repeat;
  background-size: 35px 35px;
  background-position: 10px center;
}
#search {
  width: 260px;
  height: 30px;
  background-color: #eee;
  border: 1px solid #eee;
  border-radius: 5px;
  padding-left: 20px;
  font-size: 14px;
}
.tab_control {
  position: sticky;
  top: 44px;
  z-index: 9;
}

.content {
  overflow: hidden;
  position: absolute;
  top: 44px;
  bottom: 49px;
  left: 0;
  right: 0;
}
</style>
