import editorStore from "../../../../store/CodePageStore/editorStore";
import styles from "./ChatSpace.module.css";
import SockJS from "sockjs-client";
import Stomp, { Client } from "@stomp/stompjs";
import userStore from "../../../../store/userStore/userStore";
import { FormEvent, useEffect, useRef, useState } from "react";
import defaultPicture from "/svg/profilePicture.svg";
import profileImageEnum from "../../../../store/userStore/profileImageEnum";
import { ReactComponent as ProfilePicture } from "/svg/profilePicture.svg";
interface Message {
  id: number;
  text: string;
  name: string;
  profilepicture: string;
  date: object;
}

const dummyMessage: Message[] = [
  {
    id: 5,
    text: "나는 김수연입니다. ",
    name: "김수연",
    profilepicture: defaultPicture,
    date: new Date(),
  },
  {
    id: 2,
    text: "나는 양재선입니다. ",
    name: "양재선",
    profilepicture: defaultPicture,
    date: new Date(),
  },
  {
    id: 6,
    text: "나는 최윤석입니다. ",
    name: "최윤석",
    profilepicture: defaultPicture,
    date: new Date(),
  },
  {
    id: 4,
    text: "나는 윤창호입니다.",
    name: "윤창호",
    profilepicture: defaultPicture,
    date: new Date(),
  },
  {
    id: 1,
    text: "나는 박준수입니다.",
    name: "박준수",
    profilepicture: defaultPicture,
    date: new Date(),
  },
  {
    id: 3,
    text: "나는 이재현입니다.",
    name: "이재현",
    profilepicture: defaultPicture,
    date: new Date(),
  },
];

function ChatSpace() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState("");
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const sortedMessages = dummyMessage.sort((a, b) => a.id - b.id);
    setMessages(sortedMessages);
  }, []);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollTop = messagesEndRef.current.scrollHeight;
    }
  }, [messages]);

  // 메시지 전송 핸들러 (실제 메시지 전송 로직 구현 전)
  const sendMessage = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    // 메시지 목록에 새 메시지 추가 (임시)
    setMessages([
      ...messages,
      {
        id: dummyMessage[4].id,
        text: inputText,
        name: dummyMessage[4].name,
        profilepicture: defaultPicture,
        date: new Date(),
      },
    ]);
    setInputText("");
  };

  const { rightSpace } = editorStore();
  return (
    <div className={`${rightSpace ? styles.rightSpaceOn : undefined} ${styles.rightSpace}`}>
      <div className={styles.filesTabSpace}> 채팅</div>
      <div className={` ${styles.chattingSpace} `}></div>
      <div className={styles.chat_room}>
        <div className={styles.messages} ref={messagesEndRef}>
          {messages.map((message) => (
            <div
              key={message.id}
              className={`${styles.message} ${message.name === "김수연" ? styles.myMessage : ""}`}
            >
              <img
                src={message.profilepicture}
                alt="Profile"
                className={`${styles.profilePicture} ${
                  message.name === "김수연" ? styles.myMessage_ProfilePicture : ""
                }`}
              />
              <div
                className={`${styles.messageDetail} ${
                  message.name === "김수연" ? styles.myMessage_Detail : ""
                }`}
              >
                <div className={styles.userName}>{message.name}</div>
                <div
                  className={`${styles.chat_bubble} ${
                    message.name === "김수연" ? styles.myChat_bubble : ""
                  }`}
                >
                  {message.text}
                </div>
              </div>
            </div>
          ))}
        </div>
        <form className={styles.messageForm} onSubmit={sendMessage}>
          <input
            type="text"
            className={styles.messageInput}
            placeholder="메시지를 입력하세요..."
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
          />
          <button type="submit" className={styles.sendButton}>
            Send
          </button>
        </form>
      </div>
    </div>
  );
}

export default ChatSpace;
