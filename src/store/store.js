import { configureStore } from "@reduxjs/toolkit";

import searchBarValueReducer from "./searchBarValue";
import receivedPlaceReducer from "./receivedPlace";
import receivedWeatherReducer from "./receivedWeather";

export default configureStore({
  reducer: {
    searchBarValue: searchBarValueReducer,
    receivedPlaceValue: receivedPlaceReducer,
    receivedWeatherValue: receivedWeatherReducer,
  },
});
