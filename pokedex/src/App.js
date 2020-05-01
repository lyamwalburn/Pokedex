import React, { useState } from "react";
import Search from "./search/search";
import Pokedex from "./pokedex/pokedex";

import "./App.scss";

function App() {
  const [searchResponse, setsearchResponse] = useState();

  return (
    <div className="app">
      <div className="app__container">
        <h1 className="app__title">Pokedex Search!</h1>
        <Search setData={setsearchResponse} />
        <Pokedex data={searchResponse} />
      </div>
    </div>
  );
}

export default App;
