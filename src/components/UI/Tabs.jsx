import styles from "./Tabs.module.css";

export default function Tabs({ tabs, activeIndex, tabClickHandler }) {
  return (
    <nav className={styles.tabs}>
      <ul>
        {tabs.map((tab, index) => {
          return (
            <li
              className={activeIndex == index ? styles.current : undefined}
              key={tab}
              onClick={() => {
                tabClickHandler(index);
              }}>
              {/* Using button instead of anchor tag to prevent page reload */}
              <button
                type="button"
                id={tab}
                className={activeIndex == index ? "text-white" : undefined}>
                {tab}
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
