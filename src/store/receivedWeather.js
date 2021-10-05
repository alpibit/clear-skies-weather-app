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
      // !! Need to set up icons !!
      state.weatherNowIcon = "";
      state.weatherNow = Math.round(action.payload.current.temp);
      state.weatherNowFeelsLike = Math.round(action.payload.current.feels_like);
      // !! Need to set up icons !!
      state.weatherTodayIcon = "";
      state.weatherToday = Math.round(action.payload.daily[0].temp.day);
      state.weatherTodayNight = Math.round(action.payload.daily[0].temp.night);
      // !! Need to set up icons !!
      state.weatherTomorrowIcon = "";
      state.weatherTomorrow = Math.round(action.payload.daily[1].temp.day);
      state.weatherTomorrowNight = Math.round(
        action.payload.daily[1].temp.night
      );
    },
  },
});

export const weatherActions = receivedWeatherSlice.actions;

export default receivedWeatherSlice.reducer;
