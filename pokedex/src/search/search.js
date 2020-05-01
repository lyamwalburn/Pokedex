import React, { useState } from "react";
import axios from "axios";
import Names from "./names";
import "./search.scss";

const baseURL = "https://pokeapi.co/api/v2/pokemon/";

const Search = (props) => {
  const [pokemon, setPokemon] = useState("");
  const [cache, setCache] = useState([]);
  const [cacheHits, setCacheHits] = useState(0);
  const [suggestions, setSuggestions] = useState([]);

  const searchAPI = async (ev, query, setData) => {
    //data wasn't in the cache so retreive from the api and add retrived data to cache
    ev.preventDefault();
    const searchURL = `${baseURL}${query}`;
    try {
      const res = await axios.get(searchURL);
      let newArray = cache;
      newArray.push({ name: query, data: res.data });
      setCache(newArray);
      setData({ ...res.data, success: true });
    } catch (err) {
      setData({ success: false, name: pokemon });
    }
  };

  const searchCache = async (ev, query, setData) => {
    ev.preventDefault();
    let obj = cache.find((o) => o.name === query);
    if (obj) {
      setData({ ...obj.data, success: true });
      setCacheHits(cacheHits + 1);
    } else {
      searchAPI(ev, query.toLowerCase(), setData);
    }
  };

  const onTextChanged = (ev) => {
    const value = ev.target.value;
    setPokemon(value);
    let names = [];

    if (value.length > 0) {
      const regex = new RegExp(`^${value}`, "i");
      names = Names.sort().filter((v) => regex.test(v));
    }
    setSuggestions(names);
  };

  return (
    <>
      <form
        className="search"
        onSubmit={async (ev) => searchCache(ev, pokemon, props.setData)}
      >
        <div className="search__container">
          <input
            className="search__container--input"
            type="text"
            onChange={onTextChanged}
            value={pokemon}
            placeholder={"Search for a pokemon..."}
          ></input>
          <button className="search__button">Search 'em all!</button>
          {suggestions.map((suggestion) => (
            <div
              className="search__container--suggestion"
              key={suggestion}
              onClick={async (ev) => {
                setPokemon(suggestion);
                //submit search request
                searchCache(ev, suggestion, props.setData);
                setSuggestions([]);
              }}
            >
              {suggestion}
            </div>
          ))}
        </div>
      </form>
    </>
  );
};

export default Search;
