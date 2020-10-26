<template>
  <div class="goods_item">
    <img :src="goodsItem.show.img" alt="" />
    <div class="goods_info">
      <p>{{ goodsItem.title }}</p>
      <span class="item_price">￥{{ goodsItem.price }}</span>
      <span class="item_collect">{{ goodsItem.cfav }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "GoodsListItem",
  props: {
    goodsItem: {
      type: Object,
      default() {
        return [];
      },
    },
  },
};
</script>

<style scoped>
.goods_item {
  padding-bottom: 40px;
  position: relative;
  width: 46%;
}

.goods_item img {
  width: 100%;
  border-radius: 5px;
}

.goods_info {
  font-size: 12px;
  position: absolute;
  bottom: 10px;
  left: 0;
  right: 0;
  overflow: hidden;
  text-align: center;
}

.goods_info p {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin-bottom: 3px;
}

.goods_info .item_price {
  color: var(--color-high-text);
  margin-right: 20px;
}

.goods_info .item_collect {
  position: relative;
}

.goods_info .item_collect::before {
  content: "";
  position: absolute;
  left: -15px;
  top: -1px;
  width: 14px;
  height: 14px;
  background: url("~assets/img/common/collect.svg") 0 0/14px 14px;
}
</style>