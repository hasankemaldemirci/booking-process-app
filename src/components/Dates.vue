<template>
  <form class="dates-form" @submit.prevent>
    <h1>Tarih Seçimi</h1>
    <DatePicker
      v-model="dateRange"
      mode="range"
      :popover="{ placement: 'bottom', visibility: 'click' }"
      :minDate="new Date()"
      :maxDate="maxDate"
      @input="setDateRange"
    >
      <div class="dates-form__datepicker">
        <div class="dates-form__datepicker__input">
          <span>Giriş Tarihi</span>
        </div>
        <div class="dates-form__datepicker__input">
          <span>Çıkış Tarihi</span>
        </div>
      </div>
    </DatePicker>
    <button type="submit">İleri</button>
  </form>
</template>

<script>
// Components
import DatePicker from "v-calendar/lib/components/date-picker.umd";

export default {
  name: "Dates",
  data() {
    return {
      dateRange: null
    };
  },
  components: {
    DatePicker,
  },
  computed: {
    maxDate() {
      const oneYearFromNow = new Date();
      return oneYearFromNow.setFullYear(oneYearFromNow.getFullYear() + 1);
    },
  },
  methods: {
    setDateRange(range) {
      this.$store.commit("setDateRange", range);
    },
  },
};
</script>

<style lang="scss">
.dates-form {
  &__datepicker {
    display: flex;
    margin-top: 15px;
    background-color: #fff;
    border-radius: 5px;
    cursor: pointer;

    &__input {
      flex: 1;
      padding: 15px;
    }
  }
}
</style>
