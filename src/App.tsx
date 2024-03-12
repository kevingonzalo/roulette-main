import React from "react";
import cl from "./App.module.scss";
import { RuletaElements } from "./RuletaElements.js";
import McRoulette from "./Components/Roulette/McRoulette";

function App() {
  const weaponsCount = 200;
  const transitionDuration = 0;

  return (
    <div className={cl.App}>
      <div className={cl.wrapper}>
        <McRoulette weapons={RuletaElements} weaponsCount={weaponsCount} transitionDuration={transitionDuration} />
      </div>
    </div>
  );
}

export default App;
