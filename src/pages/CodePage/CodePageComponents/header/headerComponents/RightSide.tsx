import editorStore from "@/store/CodePageStore/editorStore";
import styles from "../header.module.css";
import ModeToggleBtn from "@/globalComponents/modeToggleBtn/ModeToggleBtn";
import AccountBtn from "@/globalComponents/AccountBtn/AccountBtn";

const RightSide = () => {
  const { toggleInviteSpace } = editorStore();

  return (
    <div className={styles.rightSide_header}>
      <i
        className={`${styles.inviteKeyBtn} material-symbols-outlined`}
        onClick={toggleInviteSpace}
      >
        person_add
      </i>
      <ModeToggleBtn />
      <AccountBtn />
    </div>
  );
};

export default RightSide;
