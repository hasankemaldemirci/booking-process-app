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
    dateRange: {
      checkin: new Date(),
      checkout: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000)
    }
  },
  mutations: {
    setDateRange(state, val) {
      state.dateRange = val;
    }
  },
  actions: {},
  getters: {
    progressSteps: state => {
      return state.progressSteps;
    },
    dateRange: state => {
      return state.dateRange;
    }
  }
});
