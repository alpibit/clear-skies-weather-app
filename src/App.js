import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Logger from "./components/Logger";
import SearchBar from "./components/SearchBar";
import WeatherDisplay from "./components/WeatherDisplay";
import { receivedActions } from "./store/receivedPlace";

function App() {
  const location = useSelector((state) => state.searchBarValue.text);
  const dispatch = useDispatch();

  // Receiving Entered Location

  useEffect(() => {
    if (location) {
      async function getApiData() {
        try {
          let apiGeoUrl = `https://nominatim.openstreetmap.org/?q=<${location}>&format=json&limit=1&namedetails=1&addressdetails=1`;
          const apiResLoc = await fetch(apiGeoUrl);
          let apiDataLoc = await apiResLoc.json();
          dispatch(receivedActions.getLocData(apiDataLoc));
        } catch (error) {
          dispatch(
            receivedActions.getErrorData(
              `Could not find your location. Error Code: (${error.code}) Error Message: ${error.message}`
            )
          );
        }
      }

      getApiData();
    }
  }, [location, dispatch]);

  return (
    <div>
      <SearchBar />
      <Logger />
      <WeatherDisplay />
    </div>
  );
}

export default App;
