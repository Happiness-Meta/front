import styles from "@/pages/CodePage/CodePageComponents/sidebar/sidebar.module.css";
import { SearchFromProps } from "@/types/ComponentsProps";

const SearchForm: React.FC<SearchFromProps> = ({ term, setTerm }) => {
  return (
    <div className={styles.searchForm}>
      <input
        type="text"
        className={styles.search_input}
        placeholder="Search"
        value={term}
        onChange={(e) => setTerm(e.target.value)}
      ></input>
    </div>
  );
};

export default SearchForm;
