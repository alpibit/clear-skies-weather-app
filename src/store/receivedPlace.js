import { createSlice } from "@reduxjs/toolkit";

const receivedPlaceSlice = createSlice({
  name: "receivedPlace",
  initialState: {
    apiLat: "",
    apiLon: "",
    apiTown: "",
    apiState: "",
    apiCountry: "",
    apiError: "",
  },
  reducers: {
    getLocData(state, action) {
      state.apiLat = action.payload[0].lat;
      state.apiLon = action.payload[0].lon;
      state.apiTown = action.payload[0].namedetails.name || "";
      state.apiState = action.payload[0].address.state || "";
      state.apiCountry = action.payload[0].address.country;
      console.log(action.payload[0].address.country);
    },
    getGeoData(state, action) {
      state.apiLat = action.payload.features[0].geometry.coordinates[1]
      state.apiLon = action.payload.features[0].geometry.coordinates[0]
      state.apiTown =
        action.payload.features[0].properties.address.town ||
        action.payload.features[0].properties.address.city ||
        "";
      state.apiState =
        action.payload.features[0].properties.address.state || "";
      state.apiCountry = action.payload.features[0].properties.address.country;
    },
    getErrorData(state,action){
      state.apiError = action.payload;
    }
  },
});

export const receivedActions = receivedPlaceSlice.actions;

export default receivedPlaceSlice.reducer;
