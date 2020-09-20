<template>
  <div id="app">
    <div class="page-content">
      <div class="process-wrapper">
        <ProgressBar />
        <div class="process-wrapper__forms">
          <Dates v-if="currentStep.id === 1" />
          <Room v-if="currentStep.id === 2" />
          <Payment v-if="currentStep.id === 3" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

// Components
import ProgressBar from "./components/ProgressBar";
import Dates from "./components/Dates";
import Room from "./components/Room";
import Payment from "./components/Payment";

export default {
  name: "App",
  components: {
    ProgressBar,
    Dates,
    Room,
    Payment
  },
  computed: {
    ...mapGetters(["currentStep"])
  }
};
</script>

<style lang="scss">
.process-wrapper {
  display: flex;
  flex-direction: column;
  background-color: #f5f5f5;
  width: 700px;
  max-width: 100%;
  min-height: 635px;
  border-radius: 10px;
  box-shadow: $box-shadow;

  @media (max-width: 767px) {
    min-height: 100vh;
    width: 100%;
    border-radius: 0;
    box-shadow: none;
  }

  &__forms {
    display: flex;
    flex-direction: column;
    flex: 1;
  }
}
</style>
