import editorStore from "../../../../../store/CodePageStore/editorStore";
import styles from "./ChatSpace.module.css";
// import SockJS from "sockjs-client";
import Stomp, { Client } from "@stomp/stompjs";

function ChatSpace() {
  const { rightSpace } = editorStore();

  return (
    <div className={`${rightSpace ? styles.rightSpaceOn : undefined} ${styles.rightSpace}`}>
      <div className={styles.filesTabSpace}> 채팅</div>
      <div className={` ${styles.chattingSpace}`}></div>
    </div>
  );
}

export default ChatSpace;
