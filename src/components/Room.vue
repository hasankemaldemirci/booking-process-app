<template>
  <form class="form form--room" @submit.prevent>
    <div class="form__content">
      <h1 class="form__content__hero">Oda Seçimi</h1>
      <SelectedDates />
      <RoomTypeOptions />
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
import SelectedDates from "./SelectedDates";
import RoomTypeOptions from "./RoomTypeOptions";
import ViewOptions from "./ViewOptions";

export default {
  name: "Room",
  components: {
    RoomTypeOptions,
    ViewOptions,
    SelectedDates
  },
  computed: {
    ...mapGetters(["selectedRoomType", "selectedViewOption"])
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
