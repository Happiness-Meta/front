import editorStore from "../../../../store/CodePageStore/editorStore";
import styles from "./ChatSpace.module.css";
import SockJS from "sockjs-client";
import Stomp, { Client } from "stompjs";
import userStore from "../../../../store/userStore/userStore";
import { FormEvent, useEffect, useRef, useState } from "react";
import defaultPicture from "/svg/profilePicture.svg";
import userAxiosWithAuth from "../../../../utils/useAxiosWIthAuth";
import { useCookies } from "react-cookie";

interface ChatMessage {
  sender: string;
  content: string;
  profilepicture: string;
  type: "JOIN" | "LEAVE" | "CHAT";
  userId: string;
}

function ChatSpace() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputText, setInputText] = useState<string>("");
  const [currentMessage, setCurrentMessage] = useState<string>("");
  const [userName, setUserName] = useState<string>("");
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const clientRef = useRef<Client | null>(null);
  const { rightSpace } = editorStore();
  const [connected, setConnected] = useState<boolean>(false);
  const [cookies] = useCookies(["token", "nickname"]);
  const [repoId, setRepoId] = useState("");
  const [userId, setuserId] = useState<string>("");

  useEffect(() => {
    if (!rightSpace) {
      connect();
      console.log("rightSpace");
    }
  }, [rightSpace]);

  const connect = async () => {
    if (clientRef.current === null) {
      // 웹 소켓 fallback (소켓 통신 멈췄을 때, http로도 메시지 전송 받을 수 있게 함)
      const socket = new WebSocket("ws://43.203.92.111:8080/ws");
      const client = Stomp.over(socket);
      console.log("여기까지는 오게 됨");
      client.connect({}, onConnected, onError);
      clientRef.current = client;

      try {
        const response = await userAxiosWithAuth.get(`/api/repos/${repoId}`);
        console.log("data id:", response.data.data.id);
      } catch (error) {
        console.error("Error creating new repository:", error);
      }
    }
  };

  const onConnected = () => {
    setConnected(true);
    console.log("여기까지 온거면, 메서드는 실행 된 거.");
    clientRef.current?.subscribe("/sub/public", onMessageReceived);
    console.log("구독이 문제인가? 이거 나오면 구독은 문제 아닌 걸로");
    clientRef.current?.send(
      "/pub/chat.addUser",
      {},
      JSON.stringify({ sender: userName, type: "JOIN" })
    );
  };

  const onError = (error: any) => {
    console.error("연결 실패", error);
  };

  const sendMessage = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (currentMessage.trim() && clientRef.current) {
      const chatMessage = {
        sender: userName,
        content: currentMessage,
        type: "CHAT",
        userId: cookies.token,
      };
      setCurrentMessage("");
      setuserId(cookies.token);
      setUserName(cookies.nickname);
      clientRef.current.send("/pub/chat.sendMessage", {}, JSON.stringify(chatMessage));
      console.log("유저아이디:", userName);
    }
  };

  //안되는 부분: userid가 안받아와짐(...어 된다)
  //레포 경로 재설정
  //초대 마무리, 권한 관리

  const onMessageReceived = (payload: any) => {
    const message: ChatMessage = JSON.parse(payload.body);
    setMessages((prevMessages) => [...prevMessages, message]);
  };

  return (
    <div id="chat-page">
      <div className="chat-container">
        <div className="chat-header">
          <h2>Spring WebSocket Chat Demo</h2>
        </div>
        {!connected && (
          <div className={styles.messages} ref={messagesEndRef}>
            Connecting...
          </div>
        )}
        <ul id="messageArea">
          {messages.map((message, index) => (
            <li
              key={index}
              className={`${message.sender === userName ? styles.myMessage : styles.testMessage}`}
            >
              {message.type === "CHAT" && (
                <>
                  <strong>{message.sender}</strong> : {message.content}
                </>
              )}
              {message.type === "JOIN" && <em>{message.sender} 님이 참가했습니다.</em>}
              {message.type === "LEAVE" && <em>{message.sender} 님이 퇴장했습니다.</em>}
            </li>
          ))}
        </ul>
        <form id="messageForm" name="messageForm" onSubmit={sendMessage}>
          <input
            style={{ color: "black" }}
            type="text"
            id="message"
            placeholder="Type a message..."
            autoComplete="off"
            className="form-control"
            value={currentMessage}
            onChange={(e) => setCurrentMessage(e.target.value)}
          />
          <button type="submit" className="primary" style={{ color: "black" }}>
            Send
          </button>
        </form>
      </div>
    </div>
    // <div className={`${rightSpace ? styles.rightSpaceOn : undefined} ${styles.rightSpace}`}>
    //   <div className={styles.filesTabSpace}> 채팅</div>
    //   <div className={` ${styles.chattingSpace} `}></div>
    //   <div className={styles.chat_room}>
    //     <div className={styles.messages} ref={messagesEndRef}>
    //       {messages.map((message, index) => (
    //         <div
    //           key={index}
    //           className={`${styles.message} ${
    //             message.userId === cookies.token ? styles.myMessage : ""
    //           }`}
    //         >
    //           <img
    //             src={message.profilepicture}
    //             alt="Profile"
    //             className={`${styles.profilePicture} ${
    //               message.userId === cookies.token ? styles.myMessage_ProfilePicture : ""
    //             }`}
    //           />
    //           <div
    //             className={`${styles.messageDetail} ${
    //               message.userId === cookies.token ? styles.myMessage_Detail : ""
    //             }`}
    //           >
    //             <div className={styles.userName}>{message.sender}</div>
    //             <div
    //               className={`${styles.chat_bubble} ${
    //                 message.userId === cookies.token ? styles.myChat_bubble : ""
    //               }`}
    //             >
    //               {message.content}
    //             </div>
    //           </div>
    //         </div>
    //       ))}
    //     </div>
    //     <form className={styles.messageForm} onSubmit={sendMessage}>
    //       <input
    //         type="text"
    //         className={styles.messageInput}
    //         placeholder="메시지를 입력하세요..."
    //         value={inputText}
    //         onChange={(e) => setInputText(e.target.value)}
    //       />
    //       <button type="submit" className={styles.sendButton}>
    //         Send
    //       </button>
    //     </form>
    //   </div>
    // </div>
  );
}

export default ChatSpace;
