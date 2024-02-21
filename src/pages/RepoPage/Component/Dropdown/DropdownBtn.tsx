import styles from "./Dropdown.module.css";

interface AboutDropdown {
  isDropdownView: boolean;
  onSelectTemplate: (key: string) => void;
}

export default function Dropdown({ onSelectTemplate }: AboutDropdown) {
  const programmingLanguages = [
    { key: "JAVA", name: "Java" },
    { key: "PYTHON", name: "Python" },
    { key: "JAVASCRIPT", name: "JavaScript" },
  ];

  return (
    <div className={styles.dropdownContainer}>
      <ul className={styles.dropdownButtonContainer}>
        {programmingLanguages.map((language) => (
          <li key={language.key} onClick={() => onSelectTemplate(language.key)}>
            {language.name}
          </li>
        ))}
      </ul>
    </div>
  );
}
