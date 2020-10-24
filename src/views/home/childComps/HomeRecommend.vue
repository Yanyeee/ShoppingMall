<template>
  <div class="recommend">
    <div v-for="item in recommends" class="recommend_item" :key="item.label">
      <a :href="item.link">
        <img :src="item.image" alt="" />
        <div>{{ item.title }}</div>
      </a>
    </div>
  </div>
</template>

<script>
export default {
  name: "HomeRecommend",
  props: {
    recommends: {
      type: Array,
      default() {
        return [];
      },
    },
  },
};
</script>

<style>
.recommend {
  display: flex;
  width: 100%;
  text-align: center;
  font-size: 14px;
  padding: 10px 0;
  border-bottom: 10px solid #eee;
}
.recommend_item {
  flex: 1;
}
.recommend_item img {
  width: 90%;
  margin-bottom: 10px;
}
</style>