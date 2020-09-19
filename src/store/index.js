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
    currentStep: { id: 1, name: "TARİH", isActive: true, completed: false },
    dates: {
      start: null,
      end: null
    }
  },
  mutations: {
    setDates(state, val) {
      state.dates = val;
    },
    setProgressStep(state, val) {
      state.progressSteps.map(step => {
        if (step.id === val) {
          (step.isActive = false), (step.completed = true);
        }
        if (step.id === val + 1) {
          step.isActive = true;
          state.currentStep = step;
        }
      });
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
    dates: state => {
      return state.dates;
    }
  }
});
