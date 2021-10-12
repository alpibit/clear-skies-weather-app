import { useState } from "react";
import { useDispatch } from "react-redux";
import { receivedActions } from "../store/receivedPlace";
import { searchActions } from "../store/searchBarValue";
import Button from "../UI/Button";

import styles from "./SearchBar.module.css";

const SearchBar = () => {
  const [enteredPlace, setEnteredPlace] = useState("");
  const dispatch = useDispatch();

  // Reading input and sending it to Redux

  const placeInputChangeHandler = (event) => {
    setEnteredPlace(event.target.value);
  };

  const searchHandler = (event) => {
    event.preventDefault();
    dispatch(receivedActions.getErrorData(""));
    if (enteredPlace) {
      dispatch(searchActions.textReceive(enteredPlace));
      setEnteredPlace("");
    } else {
      dispatch(receivedActions.getErrorData("Please enter valid location"));
    }
  };

  // Geolocation API and reverse geocoding with Nominatim API

  const geoHandler = () => {
    dispatch(receivedActions.getErrorData(""));
    setEnteredPlace("");

    const options = {
      enableHighAccuracy: true,
      timeout: 3000,
      maximumAge: 0,
    };

    function success(position) {
      let apiLat = `${position.coords.latitude}`;
      let apiLon = `${position.coords.longitude}`;

      async function getApiGeo() {
        try {
          dispatch(searchActions.textReceive(""));
          const apiRevUrl = `https://nominatim.openstreetmap.org/reverse?format=geojson&lat=${apiLat}&lon=${apiLon}`;
          const apiResLoc = await fetch(apiRevUrl);
          let apiDataLoc = await apiResLoc.json();
          dispatch(receivedActions.getGeoData(apiDataLoc));
        } catch (error) {
          dispatch(
            receivedActions.getErrorData(
              `Error with reverse geocoding. Error Code: (${error.code}) Error Message: ${error.message}`
            )
          );
        }
      }
      getApiGeo();
    }

    function error(error) {
      dispatch(
        receivedActions.getErrorData(
          `Could not find your location. Error(${error.code}): ${error.message}`
        )
      );
    }

    navigator.geolocation.getCurrentPosition(success, error, options);
  };

  return (
    <main className={styles.searchForm}>
      <form onSubmit={searchHandler}>
        <input
          type="text"
          value={enteredPlace}
          className={styles.userInput}
          onChange={placeInputChangeHandler}
        />
        <Button>Search</Button>
      </form>
      <Button onClick={geoHandler} className={styles.userButton}>
        Find Me!
      </Button>
    </main>
  );
};

export default SearchBar;
