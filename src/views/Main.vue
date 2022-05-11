<template>
  <div class="app-container">
    <div class="top" v-if="animationType === 'Clouds'"></div>
    <div class="bot" v-if="animationType === 'Clouds'"></div>
    <div
      class="main-container"
      v-bind:class="{
        clear: animationType === 'Clear',
        raining: animationType === 'Rain',
        cloudy: animationType === 'Clouds',
        error: error === true,
      }"
    >
      <div class="card-wrapper">
        <div class="card-content">
          <div class="input-container">
            <input
              class="input-field"
              type="text"
              placeholder="Search City"
              v-model="countryToSearch"
              @keyup.enter="onEnter($event)"
            />
            <span class="country-info">{{ countryCode }}</span>
          </div>
          <div class="mid-section">
            <div class="feels-like">
              <h2 class="feels-like-text">Feels Like {{ feelsLike }}°</h2>
            </div>
            <div class="screen-wrapper">
              <div
                class="weather-icon"
                v-bind:style="{ 'background-image': `url(${icon})` }"
              ></div>
              <div class="mini-screen">
                <span class="screen-config">{{ temp }}°</span>
              </div>
              <div class="description feels-like-text">{{ description }}</div>
            </div>
          </div>
          <footer class="card-footer feels-like-text">
            <div class="wind feels-like-text">
              <i class="icon-wind"></i>
              <h5>{{ wind }}</h5>
            </div>
            <div class="rain feels-like-text">
              <i class="icon-droplet"></i>
              <h5>%{{ humidity }}</h5>
            </div>
            <div class="cloud feels-like-text">
              <i class="icon-cloud"></i>
              <h5>%{{ cloud }}</h5>
            </div>
          </footer>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "Main",
  data() {
    return {
      countryToSearch: "istanbul",
      countrySelected: "",
      countryInitials: "",
      temp: "",
      feelsLike: "",
      description: "",
      icon: "",
      wind: "",
      humidity: "",
      cloud: "",
      bgToSet: "",
      error: false,
      rain: "",
      animations: "false",
    };
  },
  computed: {
    ...mapState(["animationType"]),
    countryCode() {
      return `{${this.countryInitials ? this.countryInitials : ""}}`;
      // return "{" + (this.countryInitials ? this.countryInitials : "") + "}";
    },
  },
  mounted() {
    this.getCountries();
  },
  methods: {
    getCountries() {
      this.$store
        .dispatch("getWeather", {
          countryToSearch: this.countryToSearch,
        })
        .then((r) => {
          console.log(r);
          this.countryInitials = r.data.sys.country;
          this.temp = Math.round(r.data.main.temp);
          this.feelsLike = Math.round(r.data.main.feels_like);
          this.description = r.data.weather[0].description;

          let iconCode = r.data.weather[0].icon.slice(0, -1);
          this.icon = `http://openweathermap.org/img/wn/${iconCode}d@2x.png`;

          this.wind = r.data.wind.speed;
          this.humidity = r.data.main.humidity;
          this.cloud = r.data.clouds.all;
          this.bgToSet = r.data.weather[0].main;
          this.rain = r.data.weather[0].description;
          if (r.data.weather[0].main === "Clouds") {
            this.animations = true;
          }
        });
    },
    onEnter() {
      this.getCountries();
      this.error = false;
    },
    test() {
      let x = "afito";
      x.split("");
      console.log(x);
      return x;
    },
  },
};
</script>

<style scoped></style>
