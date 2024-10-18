import styles from "./Search.module.css";

export default function Search() {
  return (
    <div className={styles.search_bar}>
      <select name="city" id="cities" defaultValue="Surat">
        <option value="Ahmedabad">Ahmedabad</option>
        <option value="Rajkot">Rajkot</option>
        <option value="Surat">Surat</option>
        <option value="Valsad">Valsad</option>
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
