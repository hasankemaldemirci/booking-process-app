<template>
  <div class="selected-dates">
    <div class="selected-dates__item">
      <span>Giriş Tarihi : </span>
      <strong>{{ formattedCheckinDate }}</strong>
    </div>
    <span class="selected-dates__seperator">-</span>
    <div class="selected-dates__item">
      <span>Çıkış Tarihi : </span>
      <strong>{{ formattedCheckoutDate }}</strong>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "SelectedDates",
  computed: {
    ...mapGetters(["formattedCheckinDate", "formattedCheckoutDate"])
  }
};
</script>

<style lang="scss" scoped>
.selected-dates {
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
