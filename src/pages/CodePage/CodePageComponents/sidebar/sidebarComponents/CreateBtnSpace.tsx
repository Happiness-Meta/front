import styles from "@/pages/CodePage/CodePageComponents/sidebar/sidebar.module.css";
import { CreateBtnSpaceProps } from "@/types/ComponentsProps";

const CreateBtnSpace: React.FC<CreateBtnSpaceProps> = ({ treeRef }) => {
  return (
    <div className={styles.filesAddSpace}>
      <div
        className={`material-symbols-outlined ${styles.addFile}`}
        onClick={() => {
          treeRef.current?.createLeaf();
        }}
      >
        note_add
      </div>
      <div
        className={`material-symbols-outlined ${styles.addFolder}`}
        onClick={() => treeRef.current?.createInternal()}
      >
        create_new_folder
      </div>
    </div>
  );
};

export default CreateBtnSpace;
