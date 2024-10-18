import styles from "./Tabs.module.css";

export default function Tabs({ tabs, activeIndex, tabClickHandler }) {
  return (
    <nav className={styles.tabs}>
      <ul>
        {tabs.map((tab, index) => {
          return (
            <li
              key={tab}
              onClick={() => {
                tabClickHandler(index);
              }}
              className={
                activeIndex == index
                  ? `text-white ${styles.current}`
                  : undefined
              }>
              {tab}
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
