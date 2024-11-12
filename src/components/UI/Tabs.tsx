import { motion } from "framer-motion";

import styles from "../../styles/UI/Tabs.module.css";

interface TabsProps {
  tabs: string[];
  activeIndex: number;
  tabClickHandler: (index: number) => void;
}

const Tabs = ({ tabs, activeIndex, tabClickHandler }: TabsProps) => {
  return (
    <nav className={styles.tabs}>
      <ul className="row gap-2">
        {tabs.map((tab, index) => (
          <motion.li
            key={tab}
            onClick={() => tabClickHandler(index)}
            className={`text-500 ${
              activeIndex === index ? `text-white ${styles.current}` : ""
            }`}
            initial={false}
            animate={{
              backgroundColor:
                activeIndex === index ? "var(--var-primary-color)" : "#eceef6",
              color: activeIndex === index ? "#ffffff" : "#000000",
            }}
            transition={{ type: "tween", duration: 0.3 }}>
            {tab}
          </motion.li>
        ))}
      </ul>
    </nav>
  );
};

export default Tabs;
