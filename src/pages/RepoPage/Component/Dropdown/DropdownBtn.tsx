import React from "react";
import styles from "./Dropdown.module.css";
interface AboutDropdown {
  isDropdownView: boolean;
  onSelectTemplate: (key: string) => void;
}

export default function Dropdown({ onSelectTemplate, isDropdownView }: AboutDropdown) {
  return (
    <div className={styles.dropdownContainer}>
      <ul className={styles.dropdownButtonContainer}>
        <li onClick={() => onSelectTemplate("JAVA")}>Java</li>
        <li onClick={() => onSelectTemplate("PYTHON")}>Python</li>
        <li onClick={() => onSelectTemplate("JAVASCRIPT")}>JavaScript</li>
      </ul>
    </div>
  );
}
