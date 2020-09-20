import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    progressSteps: [
      { id: 1, name: "TARİH", isActive: true, completed: false },
      { id: 2, name: "ODA", isActive: false, completed: false },
      { id: 3, name: "ÖDEME", isActive: false, completed: false }
    ],
    currentStep: JSON.parse(localStorage.getItem("currentStep")) || {
      id: 1,
      name: "TARİH",
      isActive: true,
      completed: false
    },
    formattedCheckinDate: null,
    formattedCheckoutDate: null,
    roomTypes: [
      { id: 0, name: "Standart", checked: false },
      { id: 1, name: "Deluxe", checked: false },
      { id: 2, name: "Suit", checked: false }
    ],
    viewOptions: [
      { id: 0, name: "Deniz", checked: false },
      { id: 1, name: "Doğa", checked: false },
      { id: 2, name: "Kara", checked: false }
    ],
    selectedRoomType:
      JSON.parse(localStorage.getItem("selectedRoomType")) || null,
    selectedViewOption:
      JSON.parse(localStorage.getItem("selectedViewOption")) || null,
    cardInfo: {}
  },
  mutations: {
    setDates(state, val) {
      const formatDateOptions = {
        year: "numeric",
        month: "numeric",
        day: "numeric"
      };

      localStorage.setItem("checkinDate", val.start);
      localStorage.setItem("checkoutDate", val.end);

      const formattedCheckinDate = new Date(val.start).toLocaleDateString(
        "tr-TR",
        formatDateOptions
      );
      const formattedCheckoutDate = new Date(val.end).toLocaleDateString(
        "tr-TR",
        formatDateOptions
      );

      state.formattedCheckinDate = formattedCheckinDate;
      state.formattedCheckoutDate = formattedCheckoutDate;

      localStorage.setItem("formattedCheckinDate", formattedCheckinDate);
      localStorage.setItem("formattedCheckoutDate", formattedCheckoutDate);
    },
    setProgressStep(state, val) {
      state.progressSteps.map(step => {
        if (step.id === val) {
          (step.isActive = false), (step.completed = true);
        }

        if (step.id === val + 1) {
          step.isActive = true;
          state.currentStep = step;
          localStorage.setItem(
            "currentStep",
            JSON.stringify(state.currentStep)
          );
        }
      });
    },
    setRoomTypeSelected(state, val) {
      state.selectedRoomType = val;

      localStorage.setItem(
        "selectedRoomType",
        JSON.stringify(state.selectedRoomType)
      );
    },
    setViewOptionSelected(state, val) {
      state.selectedViewOption = val;

      localStorage.setItem(
        "selectedViewOption",
        JSON.stringify(state.selectedViewOption)
      );
    },
    setCardInfo(state, val) {
      if (Object.keys(val).length) {
        state.cardInfo = Object.assign({}, state.cardInfo, val);
      } else {
        state.cardInfo = val;
      }
    }
  },
  actions: {},
  getters: {
    progressSteps: state => {
      return state.progressSteps;
    },
    currentStep: state => {
      return state.currentStep;
    },
    formattedCheckinDate: state => {
      return (
        state.formattedCheckinDate ||
        localStorage.getItem("formattedCheckinDate")
      );
    },
    formattedCheckoutDate: state => {
      return (
        state.formattedCheckoutDate ||
        localStorage.getItem("formattedCheckoutDate")
      );
    },
    roomTypes: state => {
      return state.roomTypes;
    },
    viewOptions: state => {
      return state.viewOptions;
    },
    selectedRoomType: state => {
      return state.selectedRoomType;
    },
    selectedViewOption: state => {
      return state.selectedViewOption;
    },
    cardInfo: state => {
      return state.cardInfo;
    }
  }
});
