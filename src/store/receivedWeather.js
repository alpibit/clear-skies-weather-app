import { createSlice } from "@reduxjs/toolkit";

const receivedWeatherSlice = createSlice({
  name: "receivedWeather",
  initialState: {
    weatherNowIcon: "",
    weatherNow: "",
    weatherNowFeelsLike: "",
    weatherTodayIcon: "",
    weatherToday: "",
    weatherTodayNight: "",
    weatherTomorrowIcon: "",
    weatherTomorrow: "",
    weatherTomorrowNight: "",
  },
  reducers: {
    getWeather(state, action) {
      // Now
      state.weatherNowIcon = `I${action.payload.current.weather[0].icon}`;
      state.weatherNow = Math.round(action.payload.current.temp);
      state.weatherNowFeelsLike = Math.round(action.payload.current.feels_like);

      // Today
      state.weatherTodayIcon = `I${action.payload.daily[0].weather[0].icon}`;
      state.weatherToday = Math.round(action.payload.daily[0].temp.day);
      state.weatherTodayNight = Math.round(action.payload.daily[0].temp.night);

      // Tomorrow
      state.weatherTomorrowIcon = `I${action.payload.daily[1].weather[0].icon}`;
      state.weatherTomorrow = Math.round(action.payload.daily[1].temp.day);
      state.weatherTomorrowNight = Math.round(
        action.payload.daily[1].temp.night
      );
    },
  },
});

export const weatherActions = receivedWeatherSlice.actions;

export default receivedWeatherSlice.reducer;
