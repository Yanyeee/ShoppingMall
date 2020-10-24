<template>
  <div class="tab_bar_item" @click="itemClick">
    <div class="item_icon" v-show="!isActive">
      <slot name="item_icon"></slot>
    </div>
    <div class="item_icon_active" v-show="isActive">
      <slot name="active_icon"></slot>
    </div>
    <div class="item_text" :style="activeStyle">
      <slot name="item_text"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "TabBarItem",
  props: {
    path: String,
  },
  computed: {
    isActive() {
      return this.$route.path.indexOf(this.path) !== -1;
    },
    activeStyle() {
      return this.isActive ? { color: "var(--color-tint)" } : {};
    },
  },
  methods: {
    itemClick() {
      this.$router.replace(this.path);
    },
  },
};
</script>

<style>
.tab_bar_item {
  flex: 1;
  font-size: 14px;
}
.tab_bar_item img,
.item_icon_active img {
  width: 24px;
  height: 24px;
  margin-top: 3px;
  vertical-align: middle;
}
.item-text {
  font-size: 12px;
  margin-top: 3px;
  color: #333;
}
</style>