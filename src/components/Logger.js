import { useSelector } from "react-redux";

// Temporary component

const Logger = () => {
  const showLocation = useSelector((state) => state.receivedPlaceValue.apiTown);
  const showTown = useSelector((state) => state.receivedPlaceValue.apiCountry);
  const showError = useSelector((state) => state.receivedPlaceValue.apiError);
  const showLat = useSelector((state) => state.receivedPlaceValue.apiLat);
  const showLon = useSelector((state) => state.receivedPlaceValue.apiLon);

  return (
    <main>
      <button>Check the location</button>
      <h1>{showLocation}</h1>
      <h2>{showTown}</h2>
      <h3>{showError}</h3>
      <h4>Lat:{showLat} Lon:{showLon}</h4>
    </main>
  );
};

export default Logger;
