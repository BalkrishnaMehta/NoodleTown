import styles from "./Tabs.module.css";

export default function Tabs({ tabs, activeIndex, tabClickHandler }) {
  return (
    <nav className={styles.tabs}>
      <ul className="row gap-2">
        {tabs.map((tab, index) => {
          return (
            <li
              key={tab}
              onClick={() => {
                tabClickHandler(index);
              }}
              className={`text-500 ${
                activeIndex == index ? `text-white ${styles.current}` : ""
              }`}>
              {tab}
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
