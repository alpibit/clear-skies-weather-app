import { Fragment } from "react";
import { useSelector } from "react-redux";
import * as Icon from "../icons/IconMaster";
import Card from "../UI/Card";

const WeatherTab = () => {
  // Import Now
  const weatherIconNow = useSelector(
    (state) => state.receivedWeatherValue.weatherNowIcon
  );
  const weatherNow = useSelector(
    (state) => state.receivedWeatherValue.weatherNow
  );
  const weatherNowFeelsLike = useSelector(
    (state) => state.receivedWeatherValue.weatherNowFeelsLike
  );

  // Import Today
  const weatherTodayIcon = useSelector(
    (state) => state.receivedWeatherValue.weatherTodayIcon
  );
  const weatherToday = useSelector(
    (state) => state.receivedWeatherValue.weatherToday
  );
  const weatherTodayNight = useSelector(
    (state) => state.receivedWeatherValue.weatherTodayNight
  );

  // Import Tomorrow
  const weatherTomorrowIcon = useSelector(
    (state) => state.receivedWeatherValue.weatherTomorrowIcon
  );
  const weatherTomorrow = useSelector(
    (state) => state.receivedWeatherValue.weatherTomorrow
  );
  const weatherTomorrowNight = useSelector(
    (state) => state.receivedWeatherValue.weatherTomorrowNight
  );

  return (
    <Fragment>
      <Card>
        <img src={Icon[weatherIconNow]} />
        <div>{weatherNow}</div>
        <div>{weatherNowFeelsLike}</div>
      </Card>
      <Card>
        <img src={Icon[weatherTodayIcon]} />
        <div>{weatherToday}</div>
        <div>{weatherTodayNight}</div>
      </Card>
      <Card>
        <img src={Icon[weatherTomorrowIcon]} />
        <div>{weatherTomorrow}</div>
        <div>{weatherTomorrowNight}</div>
      </Card>
    </Fragment>
  );
};

export default WeatherTab;
