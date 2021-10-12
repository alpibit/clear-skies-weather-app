import { useSelector } from "react-redux";


const Logger = () => {
  const showTown = useSelector((state) => state.receivedPlaceValue.apiTown);
  const showCountry = useSelector((state) => state.receivedPlaceValue.apiCountry);
  const showError = useSelector((state) => state.receivedPlaceValue.apiError);


  return (
    <main>
      <h1>{showTown}</h1>
      <h2>{showCountry}</h2>
      <h3>{showError}</h3>
    </main>
  );
};

export default Logger;
