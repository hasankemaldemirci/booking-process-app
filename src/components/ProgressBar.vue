<template>
  <div class="progress-bar">
    <div
      :class="{
        'progress-bar__item': true,
        'progress-bar__item--active': step.isActive && !step.completed,
        'progress-bar__item--completed': step.completed
      }"
      v-for="step in progressSteps"
      :key="step.id"
    >
      <span class="progress-bar__item__number">{{ step.id }}</span>
      <span class="progress-bar__item__title">{{ step.name }}</span>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "ProgressBar",
  computed: {
    ...mapGetters(["progressSteps"])
  }
};
</script>

<style lang="scss">
.progress-bar {
  display: flex;
  align-items: center;
  border-bottom: 1px solid #e3e3e3;

  &__item {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    flex: 1;
    padding: 15px;
    text-align: center;

    &__number {
      position: relative;
      width: 32px;
      height: 32px;
      background-color: #ededed;
      border: 2px solid #b9b9b9;
      border-radius: 50%;
      color: $color-text;
      line-height: 30px;
      font-weight: 700;
      z-index: 1;
    }

    &__title {
      margin-top: 10px;
      font-size: 16px;
      font-weight: 600;
      line-height: 1em;
      color: #b9b9b9;
    }

    &:not(:last-child) {
      &:after {
        content: "";
        position: absolute;
        right: -50%;
        top: 30px;
        width: 100%;
        height: 2px;
        background-color: #b9b9b9;
        z-index: 0;
      }
    }

    &--active {
      .progress-bar__item__number {
        background-color: #fff;
        border-color: $color-primary;
        color: $color-primary;
      }

      .progress-bar__item__title {
        color: $color-primary;
        opacity: 1;
      }
    }

    &--completed {
      .progress-bar__item__number {
        background-color: $color-primary;
        border-color: $color-primary;
        color: #fff;
        opacity: 1;
      }

      .progress-bar__item__title {
        color: $color-text;
      }

      &:not(:last-child) {
        &:after {
          background-color: $color-primary;
        }
      }
    }
  }
}
</style>
