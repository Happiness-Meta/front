import React from "react";
import styles from "./Dropdown.module.css";

interface AboutDropdown {
  isDropdownView: boolean;
  onSelectTemplate: (key: string) => void;
}

export default function Dropdown({ onSelectTemplate, isDropdownView }: AboutDropdown) {
  return (
    <ul
      className={`${styles.dropdown} ${
        isDropdownView ? styles.slide_fade_in_dropdown : styles.slide_fade_out_dropdown
      }`}
    >
      <li onClick={() => onSelectTemplate("JAVA")}>Java</li>
      <li onClick={() => onSelectTemplate("PYTHON")}>Python</li>
      <li onClick={() => onSelectTemplate("JAVASCRIPT")}>JavaScript</li>
    </ul>
  );
}
