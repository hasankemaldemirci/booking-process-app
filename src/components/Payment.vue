<template>
  <form class="form form--payment" @submit.prevent>
    <div class="form__content">
      <h1 class="form__content__hero">Ödeme</h1>
      <SelectedDates />
      <SelectionInfo />
      <div class="flex-row">
        <div class="flex-row__column flex-row__column--6">
          <div class="form--payment__inputs">
            <div class="flex-row">
              <div class="flex-row__column flex-row__column--12">
                <input
                  type="text"
                  placeholder="Kart Üzerindeki İsim"
                  v-model="cardInfo.name"
                />
              </div>
            </div>
            <div class="flex-row">
              <div class="flex-row__column flex-row__column--12">
                <the-mask
                  type="tel"
                  placeholder="Kart Numarası"
                  v-model="cardInfo.number"
                  mask="#### #### #### ####"
                  :masked="false"
                ></the-mask>
              </div>
            </div>
            <div class="flex-row">
              <div class="flex-row__column flex-row__column--6">
                <the-mask
                  type="tel"
                  placeholder="Son Kullanma Tarihi"
                  v-model="cardInfo.expire"
                  mask="##/##"
                  :masked="true"
                ></the-mask>
              </div>
              <div class="flex-row__column flex-row__column--6">
                <the-mask
                  type="tel"
                  placeholder="CVC"
                  v-model="cardInfo.cvc"
                  mask="###"
                  :masked="false"
                  @focus.native="rotateCard"
                  @blur.native="rotateCard"
                ></the-mask>
              </div>
            </div>
          </div>
        </div>
        <div class="flex-row__column flex-row__column--6">
          <div
            :class="{ 'card-view': true, 'card-view--active': isCardRotated }"
          >
            <div class="card-view__front">
              <div class="card-view__front__center">
                <div class="number">
                  <span v-if="cardInfo.number">
                    <the-mask
                      v-model="cardInfo.number"
                      mask="#### #### #### ####"
                    ></the-mask>
                  </span>
                  <span v-else>
                    **** **** **** ****
                  </span>
                </div>
                <div class="date">
                  <span v-if="cardInfo.expire">{{ cardInfo.expire }}</span>
                  <span v-else>--/--</span>
                </div>
              </div>
              <div class="card-view__front__bottom">
                <div class="name">
                  {{ cardInfo.name ? cardInfo.name : "--" }}
                </div>
              </div>
            </div>
            <div class="card-view__back">
              <div class="card-view__back__line"></div>
              <div class="card-view__back__cvc">
                <span v-if="cardInfo.cvc">{{ cardInfo.cvc }}</span>
                <span v-else>---</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="form__footer">
      <button type="button" class="btn btn--link" @click="prev">
        Geri
      </button>
      <button
        type="submit"
        :class="{
          'btn btn--primary': true,
          'btn--disabled': !isFormValid
        }"
        :disabled="!isFormValid"
        @click="next"
      >
        Ödeme Yap
      </button>
    </div>
  </form>
</template>

<script>
import { mapState, mapGetters } from "vuex";

// Components
import SelectedDates from "./SelectedDates";
import SelectionInfo from "./SelectionInfo";
import { TheMask } from "vue-the-mask";

export default {
  name: "Payment",
  components: {
    SelectedDates,
    SelectionInfo,
    TheMask
  },
  data() {
    return {
      isCardRotated: false
    };
  },
  computed: {
    ...mapState(["cardInfo"]),
    ...mapGetters([
      "selectedRoomType",
      "selectedViewOption",
      "formattedCheckinDate",
      "formattedCheckoutDate",
      "viewOptions"
    ]),
    isFormValid() {
      let isValid = false;

      if (Object.entries(this.cardInfo).length > 3) {
        isValid =
          this.cardInfo.name.length > 0 &&
          this.cardInfo.number.length > 15 &&
          this.cardInfo.expire.length > 4 &&
          this.cardInfo.cvc.length > 2;
      }

      return isValid;
    }
  },
  methods: {
    prev() {
      this.$store.commit("setProgressStep", 1);
    },
    next() {
      this.$swal({
        icon: "success",
        title: "Rezervasyonunuz başarıyla tamamlanmıştır.",
        showConfirmButton: true,
        html: `
          <div class="flex-row">
            <div class="flex-row__column flex-row__column--6">
              Giriş Tarihi: <strong>${this.formattedCheckinDate}</strong>
            </div>
            <div class="flex-row__column flex-row__column--6">
              Çıkış Tarihi: <strong>${this.formattedCheckoutDate}</strong>
            </div>
          </div>
          <div class="flex-row">
            <div class="flex-row__column flex-row__column--6">
              Oda Tipi : <strong>${this.selectedRoomType.name}</strong>
            </div>
            <div class="flex-row__column flex-row__column--6">
              Manzara : <strong>${this.selectedViewOption.name}</strong>
            </div>
          </div>
        `
      }).then(() => {
        localStorage.removeItem("checkinDate");
        localStorage.removeItem("checkoutDate");
        localStorage.removeItem("formattedCheckinDate");
        localStorage.removeItem("formattedCheckoutDate");
        localStorage.removeItem("selectedRoomType");
        localStorage.removeItem("selectedViewOption");

        this.$store.commit("setCardInfo", {});
        this.$store.commit("setProgressStep", 0);

        window.location.href = "/";
      });
    },
    rotateCard() {
      this.isCardRotated = !this.isCardRotated;
    }
  }
};
</script>

<style lang="scss" scoped>
.form--payment__inputs {
  margin-top: 20px;

  input {
    width: 100%;
    height: 40px;
    padding: 10px;
    border-radius: 5px;
    border: 1px solid #b9b9b9;
    font-size: 16px;
  }

  .flex-row {
    &:not(:first-child) {
      margin-top: 10px;
    }

    &__column {
      @media (max-width: 767px) {
        &:not(:first-child) {
          margin-top: 10px;
        }
      }
    }
  }
}

.card-view {
  position: relative;
  height: calc(100% - 20px);
  min-height: 140px;
  margin-top: 20px;
  transition: all 0.3s linear;
  transform-style: preserve-3d;

  &--active {
    transform: rotateY(180deg);
  }

  &__back {
    transform: rotateY(180deg);
  }

  &__front,
  &__back {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    padding: 20px;
    height: 100%;
    color: $color-text;
    font-size: 16px;
    border-radius: 10px;
    transition: 0.3s;
    backface-visibility: hidden;
    transform-style: preserve-3d;
    background-image: linear-gradient(0deg, #bbcdd9, #bacbd5);

    &__center {
      display: flex;
      justify-content: space-between;
      height: 30px;
      margin-top: 35px;

      .number {
        input {
          background: transparent;
          border: none;
          font-size: 16px;
        }
      }
    }

    &__bottom {
      display: flex;
      align-items: flex-end;
      height: 30px;
      margin-top: 10px;
    }
  }

  &__back {
    &__line {
      height: 30px;
      margin-left: -20px;
      margin-right: -20px;
      margin-bottom: 10px;
      background-color: $color-text;
    }

    &__cvc {
      height: 30px;
      padding-left: 10px;
      padding-right: 10px;
      background-color: #fff;
      text-align: right;
      line-height: 30px;
    }
  }
}

.swal2-content {
  .flex-row {
    margin: 0;
  }
}
</style>
