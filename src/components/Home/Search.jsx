import styles from "./Search.module.css";
import { cities } from "../../utils/data";
import { findNearestPlace } from "../../utils/loc";
import { useEffect, useState } from "react";

export default function Search() {
  const [city, setCity] = useState();

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

  const handleCity = (e) => {
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
}
