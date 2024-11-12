import { useEffect, useState, ChangeEvent } from "react";

import { cities } from "../../utils/data";
import { findNearestPlace } from "../../utils/loc";

import styles from "../../styles/Home/Search.module.css";

const Search = () => {
  const [city, setCity] = useState<string>("");

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((pos) => {
      const nearest_city = findNearestPlace(
        cities,
        pos.coords.latitude,
        pos.coords.longitude
      );
      setCity(nearest_city.name);
    });
  }, []);

  const handleCity = (e: ChangeEvent<HTMLSelectElement>) => {
    setCity(e.target.value);
  };

  return (
    <div className={styles.search_bar}>
      <select name="city" id="cities" value={city} onChange={handleCity}>
        {cities.map((city) => {
          return (
            <option value={city.name} key={city.name}>
              {city.name}
            </option>
          );
        })}
      </select>
      <div className={styles.divider}></div>
      <input
        type="text"
        name="search"
        id="search"
        placeholder="Search for restaurant, cuisine, place"
      />
    </div>
  );
};

export default Search;
