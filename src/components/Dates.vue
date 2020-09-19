<template>
  <form class="form form--dates" @submit.prevent>
    <div class="form__content">
      <Datepicker
        value
        mode="range"
        locale="tr-TR"
        :popover="{ placement: 'bottom', visibility: 'click' }"
        :minDate="new Date()"
        :maxDate="maxDate"
        :columns="2"
        @input="setDateRange"
      >
        <div class="datepicker">
          <div class="datepicker__input">
            <label class="heading">Giriş Tarihi</label>
            <div class="date-info">
              {{ localDates.start || dates.start || "-" }}
            </div>
          </div>
          <img
            class="datepicker__seperator"
            src="@/assets/images/icon-arrow-right.svg"
          />
          <div class="datepicker__input">
            <label class="heading">Çıkış Tarihi</label>
            <div class="date-info">
              {{ localDates.end || dates.end || "-" }}
            </div>
          </div>
        </div>
      </Datepicker>
    </div>
    <div class="form__footer">
      <button
        type="submit"
        :class="{
          'btn btn--primary': true,
          'btn--disabled': !localDates
        }"
        :disabled="!localDates"
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
import Datepicker from "v-calendar/lib/components/date-picker.umd";

export default {
  name: "Dates",
  data() {
    return {
      localDates: {
        start: null,
        end: null
      },
      formatDateOptions: { year: "numeric", month: "numeric", day: "numeric" }
    };
  },
  components: {
    Datepicker
  },
  created() {
    this.localDates = JSON.parse(localStorage.getItem("dates")) || {
      start: null,
      end: null
    };
  },
  computed: {
    ...mapGetters(["dates"]),
    maxDate() {
      const oneYearFromNow = new Date();
      return oneYearFromNow.setFullYear(oneYearFromNow.getFullYear() + 1);
    }
  },
  methods: {
    setDateRange(val) {
      const start = new Date(val.start).toLocaleDateString(
        "tr-TR",
        this.formatDateOptions
      );
      const end = new Date(val.end).toLocaleDateString(
        "tr-TR",
        this.formatDateOptions
      );

      this.localDates = { start, end };
    },
    next() {
      if (this.localDates) {
        this.$store.commit("setDates", this.localDates);
        this.$store.commit("setProgressStep", 1);
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.form {
  &--dates {
    .datepicker {
      display: flex;
      background-color: #fff;
      border-radius: 5px;
      cursor: pointer;

      &__input {
        flex: 1;
        padding: 15px;

        .heading {
          font-size: 18px;
          font-weight: 600;
          opacity: 0.5;
        }

        .date-info {
          font-size: 20px;
          font-weight: 700;
        }
      }

      &__seperator {
        max-width: 30px;
        margin-left: 20px;
        margin-right: 20px;
        opacity: 0.3;
      }
    }

    .form__footer {
      .btn {
        margin-left: auto;
      }
    }
  }
}
</style>
