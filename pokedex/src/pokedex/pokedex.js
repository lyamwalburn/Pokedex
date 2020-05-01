import React, { useState } from "react";

import "./pokedex.scss";

//TODO find out how to manipulate the svg in code
import triangleL from "./triangle-left.svg";
import triangleR from "./triangle-right.svg";

const Screen = (props) => {
  const data = props.data;

  const getAttribute = (key, name, unit, getText) => {
    if (!data[key]) return null;

    return (
      <>
        <div className="pokedex__screen-row">
          <span className="pokedex__screen-key">{name}:</span>
          <span className="pokedex__screen-value">
            {getText ? getText(data[key]) : data[key]}
            {unit ? unit : null}
          </span>
        </div>
      </>
    );
  };

  return props.side === "left" ? (
    <>
      {getAttribute("id", "Id")}
      {getAttribute("weight", "Weight", "Lbs.")}
      {getAttribute("height", "Height", "Ft.")}
      {getAttribute("species", "Species", "", (species) => species.name)}
      {getAttribute("abilities", "Abilities", "", (abilities) => {
        return abilities
          .map((ability) => {
            return ability.ability.name;
          })
          .join(", ");
      })}
      {getAttribute("types", "Type", "", (types) => {
        return types
          .map((type) => {
            return type.type.name;
          })
          .join(", ");
      })}
      {getAttribute("stats", "Stats", "", (stats) => {
        return stats
          .map((stat) => {
            return `${stat.stat.name}: ${stat.base_stat}`;
          })
          .join(", ");
      })}
    </>
  ) : (
    <>
      {getAttribute("moves", "Moves", "", (moves) => {
        return moves
          .map((move) => {
            return move.move.name;
          })
          .join(", ");
      })}
    </>
  );
};

const Pokedex = (props) => {
  const data = props.data || {};

  const images = data.sprites ? Object.values(data.sprites) : null;
  const filtered = images
    ? images.filter((el) => {
        return el != null;
      })
    : null;

  const [imageIndex, setImageIndex] = useState(0);
  const pokemonImage = filtered ? (
    <img src={filtered[imageIndex]} alt="pokemon" className="pokedex__image" />
  ) : (
    <div className="pokedex__image" />
  );

  return (
    <div className="pokedex">
      <div className="pokedex__container">
        <div className="pokedex__top">
          <span className="pokedex__camera" />
        </div>
        <div className="pokedex__top pokedex__top--right">
          <span className="pokedex__dot pokedex__dot--red" />
          <span className="pokedex__dot pokedex__dot--yellow" />
          <span className="pokedex__dot pokedex__dot--green" />
        </div>
        <div className="pokedex__image-container">
          {pokemonImage}
          <div className="pokedex__button-container">
            <button
              className="pokedex__button-container pokedex__button-container--button"
              onClick={() => {
                setImageIndex(
                  imageIndex - 1 <= 0 ? filtered.length - 1 : imageIndex - 1
                );
                console.log(imageIndex);
              }}
            >
              <img src={triangleL} />
            </button>
            <button
              className="pokedex__button-container pokedex__button-container--button"
              onClick={() => {
                setImageIndex(
                  imageIndex + 1 >= filtered.length ? 0 : imageIndex + 1
                );
                console.log(imageIndex);
              }}
            >
              <img src={triangleR} />
            </button>
          </div>
        </div>
      </div>
      <div className="pokedex__container pokedex__container--right">
        <div className="pokedex__screen">
          <h4 className="pokedex__screen-title">
            {data.success && data.name ? data.name : null}
          </h4>

          <Screen data={data} side={"left"} />
        </div>
        <div className="pokedex__screen pokedex__screen--right">
          <Screen data={data} side={"right"} />
        </div>
      </div>
    </div>
  );
};

export default Pokedex;
