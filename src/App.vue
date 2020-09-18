<template>
  <div id="app">
    <div class="page-content">
      <div class="process-wrapper">
        <ProgressBar />
      </div>
    </div>
  </div>
</template>

<script>
// Components
import ProgressBar from "./components/ProgressBar";

export default {
  name: "App",
  components: {
    ProgressBar
  }
};
</script>

<style lang="scss">
.process-wrapper {
  background-color: #f5f5f5;
  width: 800px;
  max-width: 100%;
  border-radius: 10px;
  box-shadow: $box-shadow;
}
</style>
