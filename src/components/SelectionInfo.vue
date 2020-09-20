<template>
  <div class="selection-info">
    <div class="selection-info__item">
      <span>Oda Tipi : </span>
      <strong>{{ selectedRoomType.name }}</strong>
    </div>
    <span class="selection-info__seperator">-</span>
    <div class="selection-info__item">
      <span>Manzara : </span>
      <strong>{{ selectedViewOption.name }}</strong>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "SelectionInfo",
  computed: {
    ...mapGetters(["selectedRoomType", "selectedViewOption"])
  }
};
</script>

<style lang="scss" scoped>
.selection-info {
  display: flex;
  font-size: 16px;

  &__item {
    > span {
      opacity: 0.75;
    }
  }

  &__seperator {
    margin-left: 10px;
    margin-right: 10px;
  }
}
</style>
