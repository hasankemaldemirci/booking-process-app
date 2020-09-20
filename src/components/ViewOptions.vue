<template>
  <div class="view-type">
    <label class="view-type__hero">Manzara Seçimi : </label>
    <div class="view-type__options">
      <label
        class="view-type__options__item"
        v-for="viewOption in viewOptions"
        :key="viewOption.id"
        :for="`view-option-${viewOption.id}`"
      >
        <input
          type="radio"
          name="view-select-options"
          :id="`view-option-${viewOption.id}`"
          :checked="
            selectedViewOption
              ? selectedViewOption.id === viewOption.id
              : viewOption.checked
          "
          @change="changeViewOptionSelected(viewOption.id)"
        />
        {{ viewOption.name }}
      </label>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "ViewOptions",
  computed: {
    ...mapGetters(["viewOptions", "selectedViewOption"])
  },
  methods: {
    changeViewOptionSelected(index) {
      const viewOptions = this.viewOptions.slice();

      viewOptions.map(item => (item.checked = false));
      viewOptions[index].checked = !viewOptions[index].checked;

      this.$store.commit("setViewOptionSelected", viewOptions[index]);
    }
  }
};
</script>

<style lang="scss" scoped>
.view-type {
  display: flex;
  margin-top: 10px;

  @media (max-width: 767px) {
    align-items: center;
    margin-top: 30px;
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
      margin-right: 30px;
      font-weight: 600;

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
