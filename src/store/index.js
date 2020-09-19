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
    dates: JSON.parse(localStorage.getItem("dates")) || {
      start: null,
      end: null
    },
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
    selectedRoomType: null,
    selectedViewOption: null
  },
  mutations: {
    setDates(state, val) {
      state.dates = val;

      localStorage.setItem("dates", JSON.stringify(val));
    },
    setProgressStep(state, val) {
      state.progressSteps.map((step) => {
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
    },
    setViewOptionSelected(state, val) {
      state.selectedViewOption = val;
    }
  },
  actions: {},
  getters: {
    progressSteps: (state) => {
      return state.progressSteps;
    },
    currentStep: (state) => {
      return state.currentStep;
    },
    dates: (state) => {
      return state.dates;
    },
    roomTypes: (state) => {
      return state.roomTypes;
    },
    viewOptions: (state) => {
      return state.viewOptions;
    },
    selectedRoomType: (state) => {
      return state.selectedRoomType;
    },
    selectedViewOption: (state) => {
      return state.selectedViewOption;
    }
  }
});
