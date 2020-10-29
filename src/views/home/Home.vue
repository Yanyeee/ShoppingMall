<template>
  <div id="home">
    <NavBar class="home-nav">
      <template v-slot:left>
        <div id="logo"></div>
      </template>
      <template v-slot:center>
        <input id="search" type="text" placeholder="牛仔裤" />
      </template>
    </NavBar>
    <TabControl
      class="tab-control"
      ref="tabControl1"
      v-show="isTabFixed"
      @tabClick="tabClick"
      :titles="['为您推荐', '热销爆款', '精选优品']"
    />
    <Scroll
      class="content"
      ref="scroll"
      :probeType="3"
      @scroll="contentScroll"
      :pullUpLoad="true"
      @pullingUp="loadMore"
    >
      <HomeSwiper :banners="banners" @swiperImageLoad="swiperImageLoad" />
      <HomeRecommend :recommends="recommends" />
      <TabControl
        ref="tabControl2"
        @tabClick="tabClick"
        :titles="['为您推荐', '热销爆款', '精选优品']"
      />
      <GoodsList :goods="showGoods" />
    </Scroll>

    <!-- native修饰符 监听组件的原生事件 -->
    <BackTop @click.native="backTop" v-show="isShowBackTop" />
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar";
import HomeSwiper from "./childComps/HomeSwiper";
import HomeRecommend from "./childComps/HomeRecommend";
import TabControl from "components/content/tabControl/TabControl";
import GoodsList from "components/content/goods/GoodsList";
import Scroll from "components/common/scroll/Scroll";
// import BackTop from "components/content/backTop/BackTop";

import { getHomeMultiData, getHomeGoods } from "network/home";
import { debounce } from "common/utils";
import { itemListenerMixin, backTopMixin } from "common/mixin";
import { BACK_POSITION } from "common/const";

export default {
  name: "Home",
  mixins: [itemListenerMixin, backTopMixin],
  components: {
    NavBar,
    HomeSwiper,
    HomeRecommend,
    TabControl,
    GoodsList,
    Scroll,
  },
  data() {
    return {
      result: null,
      banners: [],
      recommends: [],
      goods: {
        pop: { page: 0, list: [] },
        new: { page: 0, list: [] },
        sell: { page: 0, list: [] },
      },
      currentType: "pop",
      isShowBackTop: false,
      tabOffestTop: 0,
      isTabFixed: false,
      saveY: 0,
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
  mounted() {
    //监听图片加载事件
    const refresh = debounce(this.$refs.scroll.refresh, 400);
    //监听item中图片加载完成
    this.$bus.$on("itemImageLoad", () => {
      refresh();
    });
  },
  activated() {
    this.$refs.scroll.scrollTo(0, this.saveY, 0);
    this.$refs.scroll.refresh();
  },
  deactivated() {
    this.saveY = this.$refs.scroll.getScrollY();
    //取消监听
    this.$bus.$off("itemImgLoad", this.itemImgListener);
  },
  methods: {
    //1.事件监听相关方法
    tabClick(index) {
      //点击tabControl切换商品列表
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
      this.$refs.tabControl1.currentIndex = index;
      this.$refs.tabControl2.currentIndex = index;
    },

    //加载更多图片
    loadMore() {
      this.getHomeGoods(this.currentType);
      this.$refs.scroll.refresh();
    },

    contentScroll(position) {
      //BackTop是否显示
      this.listenShowBackTop(position);
      // tabControl是否吸顶
      this.isTabFixed = -position.y > this.tabOffsetTop;
    },
    //点击backTop回到页面头部
    backTop() {
      this.$refs.scroll.scrollTo(0, 0);
    },
    swiperImageLoad() {
      // 获取tabControl的offsetTop
      // 所有的组件都有$el 属性，用于获取组件中的元素
      this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop;
      console.log(this.tabOffsetTop);
    },

    //2.网络请求相关方法
    //获取并保存广告数据
    getHomeMultiData() {
      getHomeMultiData().then((res) => {
        this.result = res;
        this.banners = res.data.banner.list;
        this.recommends = res.data.recommend.list;
      });
    },
    //获取并保商品列表和数据
    getHomeGoods(type) {
      const page = this.goods[type].page + 1;
      getHomeGoods(type, page).then((res) => {
        this.goods[type].list.push(...res.data.list);
        this.goods[type].page += 1;

        //完成上拉
        this.$refs.scroll.finishPullUp();
      });
    },
  },
};
</script>

<style scoped>
#home {
  position: relative;
  height: 100vh;
}

.home-nav {
  background-color: #fff;
  /* 
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  z-index: 9; */
}

.tab-control {
  position: relative;
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

.content {
  position: absolute;
  overflow: hidden;
  top: 44px;
  bottom: 49px;
  left: 0;
  right: 0;
}
</style>