<template>
  <div class="room-type">
    <label class="room-type__hero">Oda Tipi Seçimi : </label>
    <div class="room-type__options">
      <label
        class="room-type__options__item"
        v-for="roomType in roomTypes"
        :key="roomType.id"
        :for="`room-type-option-${roomType.id}`"
      >
        <input
          type="radio"
          name="room-type"
          :id="`room-type-option-${roomType.id}`"
          :checked="
            selectedRoomType
              ? selectedRoomType.id === roomType.id
              : roomType.checked
          "
          @change="changeRoomTypeSelected(roomType.id)"
        />
        {{ roomType.name }}
      </label>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "RoomTypeOptions",
  computed: {
    ...mapGetters(["roomTypes", "selectedRoomType"])
  },
  methods: {
    changeRoomTypeSelected(index) {
      const roomTypes = this.roomTypes.slice();

      roomTypes.map(item => (item.checked = false));
      roomTypes[index].checked = !roomTypes[index].checked;

      this.$store.commit("setRoomTypeSelected", roomTypes[index]);
    }
  }
};
</script>

<style lang="scss" scoped>
.room-type {
  display: flex;
  margin-top: 30px;

  @media (max-width: 767px) {
    align-items: center;
  }

  &__hero {
    flex: 0 0 120px;
    max-width: 120px;
    margin-right: 10px;
    opacity: 0.75;
  }

  &__options {
    display: flex;

    @media (max-width: 767px) {
      flex-direction: column;
    }

    &__item {
      display: flex;
      align-items: center;
      font-weight: 600;
      margin-right: 30px;

      input {
        width: 20px;
        height: 20px;
        margin-right: 5px;
      }

      & + & {
        @media (max-width: 767px) {
          margin-top: 10px;
        }
      }
    }
  }
}
</style>
