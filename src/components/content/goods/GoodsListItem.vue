<template>
  <div class="product-item" @click="itemClick">
    <img v-lazy="showImage" alt="" @load="imageLoad" />
    <div class="product-info">
      <p>{{ product.title }}</p>
      <span class="price">￥{{ product.price }}</span>
      <span class="collect">{{ product.cfav }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "GoodsListItem",
  props: {
    product: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  // created(){
  //     console.log(this.product)
  //   },
  computed: {
    //懒加载
    showImage() {
      return this.product.img || this.product.image || this.product.show.img;
    },
  },
  methods: {
    imageLoad() {
      this.$bus.$emit("itemImageLoad");
    },
    //路由保存位置和商品id
    itemClick() {
      this.$router.push("/detail/" + this.product.iid);
    },
  },
};
</script>

<style scoped>
.product-item {
  padding-bottom: 40px;
  position: relative;
  width: 46%;
}

.product-item img {
  width: 100%;
  border-radius: 5px;
}

.product-info {
  font-size: 12px;
  position: absolute;
  bottom: 5px;
  left: 0;
  right: 0;
  overflow: hidden;
  text-align: center;
}

.product-info p {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin-bottom: 3px;
}

.product-info .price {
  color: var(--color-high-text);
  margin-right: 20px;
}

.product-info .collect {
  position: relative;
}

.product-info .collect::before {
  content: "";
  position: absolute;
  left: -15px;
  top: -1px;
  width: 14px;
  height: 14px;
  background: url("~assets/img/common/collect.svg") 0 0/14px 14px;
}
</style>