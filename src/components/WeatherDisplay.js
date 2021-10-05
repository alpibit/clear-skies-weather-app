import { useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import config from "../config";
import { receivedActions } from "../store/receivedPlace";
import { weatherActions } from "../store/receivedWeather";
import WeatherTab from "./WeatherTab";

const Weather = () => {
  const dispatch = useDispatch();
  const apiLat = useSelector((state) => state.receivedPlaceValue.apiLat);
  const apiLon = useSelector((state) => state.receivedPlaceValue.apiLon);

  // Receiving weather data

  useEffect(() => {
    // "IF" check to see if Geolocation API has been successful
    if (apiLat && apiLon) {

    async function getWeatherData() {
      try {
        const apiWeatherUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${apiLat}&lon=${apiLon}&exclude=minutely,hourly&appid=${config.API_TOKEN}&units=metric`;
        const apiResWea = await fetch(apiWeatherUrl);
        const apiWeather = await apiResWea.json();
        if (apiWeather.cod !== "400") {
          dispatch(weatherActions.getWeather(apiWeather));
        }
        if (!apiResWea.ok) {
          throw new Error("Nothing to geocode");
        }
      } catch (error) {
        dispatch(
          receivedActions.getErrorData(
            `Could not find your location. Error Code: (${error.code}) Error Message: ${error.message}`
          )
        );
      }
    }
    getWeatherData();
  }

    
  }, [apiLat, apiLon, dispatch]);

  return <WeatherTab />;
};

export default Weather;
