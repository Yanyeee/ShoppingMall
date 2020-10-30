<template>
  <GridView :lineSpace="15" :v-margin="20" v-if="categoryDetail">
    <GoodsListItem
      v-for="(item, index) in categoryDetail"
      :key="index"
      :product="item"
    ></GoodsListItem>
  </GridView>
</template>

<script>
import GridView from "components/common/grid/GridView";
import GoodsListItem from "components/content/goods/GoodsListItem";

export default {
  name: "TabContentDetail",
  components: {
    GridView,
    GoodsListItem,
  },
  props: {
    categoryDetail: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  created() {
    console.log(this.categoryDetail);
  },
};
</script>

<style scoped>
</style>
