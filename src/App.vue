<template>
  <div id="app">
    <keep-alive exclude="Detail"><router-view></router-view></keep-alive>
    <MainTabBar />
    <Icon />
    <SvgIcon />
  </div>
</template>

<script>
import MainTabBar from "components/content/mainTabbar/MainTabBar";
import Icon from "components/content/Icon/Icon.vue";
import SvgIcon from "components/content/Icon/Svg.vue";

export default {
  name: "app",
  components: {
    MainTabBar,
    Icon,
    SvgIcon,
  },
};
</script>

<style scoped>
@import "./assets/css/base.css";
</style>
