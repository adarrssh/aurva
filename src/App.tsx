import Graph from "./Graph/Graph";
import "./App.css";
import Navabar from "./components/Navbar/Navabar";
import SideBar from "./components/SideBar/SideBar";
import { useState } from "react";

const App = () => {
  const [showDetailsPopup, setShowDetailsPopup] = useState<boolean>(false);
  const [mealDetails, setMealDetails] = useState({
    strArea: "",
    strCategory: "",
    strInstructions: "",
    strMealThumb: "",
    strYoutube: "",
    strMeal: "",
    strSource: "",
  });

  return (
    <>
      <Navabar />
      <Graph
        showDetailsPopup={showDetailsPopup}
        setShowDetailsPopup={setShowDetailsPopup}
        setMealDetails={setMealDetails}
      />
      {showDetailsPopup && (
        <SideBar
          setShowDetailsPopup={setShowDetailsPopup}
          mealDetails={mealDetails}
        />
      )}
    </>
  );
};

export default App;
