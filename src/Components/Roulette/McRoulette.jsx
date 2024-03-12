import React, { useRef, useState } from "react";
import cl from "./roulette.module.scss";
import RouletteItem from "./RouletteItem/RouletteItem";
import { Roulette } from "../../roulette.classes";

const McRoulette = ({ weapons, weaponsCount, transitionDuration }) => {
  const [rouletteWeapons, setRouletteWeapons] = useState(weapons);
  const [weaponPrizeId, setWeaponPrizeId] = useState(-1);
  const [isReplay, setIsReplay] = useState(false);
  const [isSpin, setIsSpin] = useState(false);
  const [isSpinEnd, setIsSpinEnd] = useState(false);
  const [winHistory, setWinHistory] = useState([]);
  const [selectedWeapon, setSelectedWeapon] = useState(null);

  const rouletteContainerRef = useRef(null);
  const weaponsRef = useRef(null);

  function transitionEndHandler() {
    const selected = rouletteWeapons[weaponPrizeId];
    setWinHistory(winHistory.concat(selected));
    setSelectedWeapon(selected);
    setIsSpin(false);
    setIsSpinEnd(true);
  }
  function prepare() {
    weaponsRef.current.style.transition = "none";
    weaponsRef.current.style.left = "0px";
  }

  function load() {
    let winner = weapons[Math.floor(Math.random() * weapons.length)];

    const roulette = new Roulette({
      winner,
      weapons,
      rouletteContainerRef,
      weaponsRef,
      weaponsCount,
      transitionDuration,
    });

    roulette.set_weapons();
    setRouletteWeapons(roulette.weapons);

    return roulette;
  }

  function play() {
    if (isReplay) {
      prepare();
    }
    setIsSpin(true);

    const roulette = load();

    setTimeout(() => {
      setIsSpin(true);
      setWeaponPrizeId(roulette.spin());
      setIsReplay(true);
    }, 1000);
  }
  return (
    <div>
      <div className={cl.rouletteWrapper}>
        <div ref={rouletteContainerRef}>
          <div className={cl.evRoulette}>
            <div className={cl.evTarget}></div>
            <div ref={weaponsRef} className={cl.evWeapons} onTransitionEnd={transitionEndHandler}>
              {rouletteWeapons.map((w, i) => (
                <RouletteItem
                  key={i}
                  id={i}
                  isLoser={i !== weaponPrizeId && !isSpin && isSpinEnd}
                  weapon_name={w.weapon_name}
                  skin_name={w.skin_name}
                  rarity={w.rarity}
                  steam_image={w.steam_image}
                />
              ))}
            </div>
          </div>
        </div>
        <button className={cl.button} disabled={isSpin} onClick={play}>
          Roll
        </button>
      </div>
      {isSpinEnd && (
        <div>
          <h2>Resultado:</h2>
          {selectedWeapon && (
            <div>
              <p>Arma: {selectedWeapon.weapon_name}</p>
              <p>Skin: {selectedWeapon.skin_name}</p>
              <p>Rareza: {selectedWeapon.rarity}</p>
              {/* Agrega cualquier otra información que desees mostrar */}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default McRoulette;
