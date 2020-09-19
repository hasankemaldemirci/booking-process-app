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
          :checked="roomType.checked"
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
  name: "RoomTypes",
  computed: {
    ...mapGetters(["roomTypes"])
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

  &__hero {
    flex: 0 0 120px;
    max-width: 120px;
    margin-right: 10px;
    opacity: 0.75;
  }

  &__options {
    display: flex;

    &__item {
      display: flex;
      align-items: center;
      font-weight: 600;

      input {
        margin-right: 5px;
      }

      & + & {
        margin-left: 20px;
      }
    }
  }
}
</style>
