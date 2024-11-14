import { useEffect, useState, ChangeEvent, FormEvent, useRef } from "react";

import { cities } from "../utils/data";
import { findNearestPlace } from "../utils/loc";

import styles from "../styles/forms/Search.module.css";

const Search = () => {
  const [city, setCity] = useState("Ahmedabad");
  const searchQuery = useRef<HTMLInputElement | null>(null);

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

  const handleSubmit = (event: FormEvent) => {
    event?.preventDefault();
    alert(
      `Selected City: ${city}\nSearch Query: ${searchQuery.current?.value}`
    );
  };

  return (
    <form onSubmit={handleSubmit}>
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
          ref={searchQuery}
        />
      </div>
    </form>
  );
};

export default Search;
