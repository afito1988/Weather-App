import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    animationType: "",
  },
  mutations: {
    setAnimationType(state, value) {
      state.animationType = value;
    },
  },
  actions: {
    async getWeather(context, payload) {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${payload.countryToSearch}&units=metric&appid=921d0769a2b7f46798ef1e30c6740cc1`
      );

      if (response) {
        context.commit("setAnimationType", response.data.weather[0].main);
      }

      return response;
    },
    getWeather1(context, payload) {
      return new Promise((resolve, reject) => {
        axios
          .get(
            `https://api.openweathermap.org/data/2.5/weather?q=${payload.countryToSearch}&units=metric&appid=921d0769a2b7f46798ef1e30c6740cc1`
          )
          .then((r) => {
            context.commit("setAnimationType", r.data.weather[0].main);
            resolve(r);
          })
          .catch((response) => {
            reject(response);
          });
      });
    },
  },
  modules: {},
});
