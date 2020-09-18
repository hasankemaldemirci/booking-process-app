<template>
  <div id="app">
    <div class="page-content">
      <div class="process-wrapper">
        <ProgressBar />
        <div class="process-wrapper__forms">
          <Dates />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// Components
import ProgressBar from "./components/ProgressBar";
import Dates from "./components/Dates";

export default {
  name: "App",
  components: {
    ProgressBar,
    Dates
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

  &__forms {
    padding: 15px;
  }
}
</style>
