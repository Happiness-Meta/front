// components/Modal.js
import RepoPageStore from "../../../store/RepoPageStore/repoPageStore";
import styles from "./Repomodal.module.css";

const RepoModal = () => {
  const { toggleModal, show } = RepoPageStore();

  if (!show) return null;

  return (
    <div className={styles.modalBackground}>
      <div
        className={styles.modalContainer}
        onClick={(e) => e.stopPropagation()}
      >
        <p> 모달 모달 </p>
        <button onClick={toggleModal}>닫기</button>
      </div>
    </div>
  );
};

export default RepoModal;
