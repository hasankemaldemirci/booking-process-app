<template>
  <form class="form form--dates" @submit.prevent>
    <div class="form__content">
      <h1 class="form__content__hero">Tarih Seçimi</h1>
      <div class="datepicker" @click="showDatepicker = !showDatepicker">
        <div class="datepicker__input">
          <label class="heading">Giriş Tarihi</label>
          <div class="date-info">
            {{ formattedCheckinDate }}
          </div>
        </div>
        <img
          class="datepicker__seperator"
          src="@/assets/images/icon-arrow-right.svg"
        />
        <div class="datepicker__input">
          <label class="heading">Çıkış Tarihi</label>
          <div class="date-info">
            {{ formattedCheckoutDate }}
          </div>
        </div>
      </div>
      <Datepicker
        v-if="showDatepicker"
        :value="localDates"
        :popover="{ placement: 'bottom' }"
        :minDate="new Date()"
        :maxDate="maxDate"
        :columns="$screens({ default: 1, md: 2 })"
        mode="range"
        locale="tr-TR"
        is-expanded
        is-inline
        @input="setDateRange"
      >
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
        start: new Date(),
        end: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000)
      },
      showDatepicker: false
    };
  },
  components: {
    Datepicker
  },
  created() {
    if (
      localStorage.getItem("checkinDate") &&
      localStorage.getItem("checkoutDate")
    ) {
      this.localDates.start = new Date(localStorage.getItem("checkinDate"));
      this.localDates.end = new Date(localStorage.getItem("checkoutDate"));
    }

    this.$store.commit("setDates", this.localDates);
  },
  computed: {
    ...mapGetters(["formattedCheckinDate", "formattedCheckoutDate"]),
    maxDate() {
      const oneYearFromNow = new Date();
      return oneYearFromNow.setFullYear(oneYearFromNow.getFullYear() + 1);
    }
  },
  methods: {
    setDateRange(val) {
      this.localDates.start = val.start;
      this.localDates.end = val.end;

      this.$store.commit("setDates", this.localDates);

      this.showDatepicker = !this.showDatepicker;
    },
    next() {
      this.$store.commit("setDates", this.localDates);
      this.$store.commit("setProgressStep", 1);
    }
  }
};
</script>

<style lang="scss" scoped>
.form {
  &--dates {
    .datepicker {
      display: flex;
      align-items: center;
      background-color: #fff;
      border-radius: 5px;
      cursor: pointer;

      @media (max-width: 767px) {
        max-height: 90px;
        flex: 0 0 90px;
        height: 90px;
      }

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

        @media (max-width: 767px) {
          max-width: 20px;
          margin-right: 5px;
          margin-left: 5px;
        }
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
