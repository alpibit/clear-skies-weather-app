import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { receivedActions } from "../store/receivedPlace";
import { searchActions } from "../store/searchBarValue";
import Button from "../UI/Button";

import styles from "./SearchBar.module.css";

const SearchBar = () => {
  const inputRef = useRef();
  const dispatch = useDispatch();
  const searchReport = useSelector((state) => state.searchBarValue.text);

  // Reading input and sending it to Redux

  const searchHandler = (event) => {
    event.preventDefault();
    dispatch(searchActions.textReceive(inputRef.current.value));
    console.log(searchReport);
  };

  // Geolocation API and reverse geocoding with Nominatim API

  const geoHandler = () => {
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
          console.log(apiDataLoc);
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
        <input ref={inputRef} type="text" className={styles.userInput} />
        <Button>Search</Button>
      </form>
      <Button onClick={geoHandler} className={styles.userButton}>
        Find Me!
      </Button>
    </main>
  );
};

export default SearchBar;
