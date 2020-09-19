<template>
  <form class="form form--room" @submit.prevent>
    <div class="form__content">
      <div class="selected-dates">
        <div class="selected-dates__item">
          <span>Giriş Tarihi : </span>
          <strong>{{ dates.start }}</strong>
        </div>
        <span class="selected-dates__seperator">-</span>
        <div class="selected-dates__item">
          <span>Çıkış Tarihi : </span>
          <strong>{{ dates.end }}</strong>
        </div>
      </div>
      <RoomTypes />
      <ViewOptions />
    </div>
    <div class="form__footer">
      <button type="button" class="btn btn--link" @click="prev">
        Geri
      </button>
      <button
        type="submit"
        :class="{
          'btn btn--primary': true,
          'btn--disabled': !selectedRoomType || !selectedViewOption
        }"
        :disabled="!selectedRoomType || !selectedViewOption"
        @click="next"
      >
        İleri
      </button>
    </div>
  </form>
</template>

<script>
import { mapGetters } from "vuex";

// Components
import RoomTypes from "./RoomTypes";
import ViewOptions from "./ViewOptions";

export default {
  name: "Room",
  components: {
    RoomTypes,
    ViewOptions
  },
  computed: {
    ...mapGetters(["dates", "selectedRoomType", "selectedViewOption"])
  },
  methods: {
    prev() {
      this.$store.commit("setProgressStep", 0);
    },
    next() {
      this.$store.commit("setProgressStep", 2);
    }
  }
};
</script>

<style lang="scss" scoped>
.form--room {
  font-size: 16px;
}

.selected-dates {
  display: flex;
  font-size: 16px;
  margin-bottom: 30px;

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
