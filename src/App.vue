<template>
  <div id="app">
    <div class="page-content">
      <div class="process-wrapper">
        <ProgressBar />
        <div class="process-wrapper__forms">
          <Dates v-if="currentStep.id === 1" />
          <Room v-if="currentStep.id === 2" />
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

export default {
  name: "App",
  components: {
    ProgressBar,
    Dates,
    Room
  },
  computed: {
    ...mapGetters(["currentStep"])
  }
};
</script>

<style lang="scss">
.process-wrapper {
  background-color: #f5f5f5;
  width: 600px;
  max-width: 100%;
  border-radius: 10px;
  box-shadow: $box-shadow;
}
</style>
