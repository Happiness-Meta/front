import editorStore from "../../../../store/CodePageStore/editorStore";
import styles from "./ChatSpace.module.css";
import Stomp, { Client } from "stompjs";
import { useEffect, useRef, useState } from "react";
import userAxiosWithAuth from "../../../../utils/useAxiosWIthAuth";
import { useCookies } from "react-cookie";
import { useParams } from "react-router-dom";

interface ChatMessage {
  sender: string;
  content: string;
  type: "JOIN" | "LEAVE" | "CHAT";
  userId: string;
}

function ChatSpace() {
  const { repoId } = useParams();
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [currentMessage, setCurrentMessage] = useState<string>("");
  const [userName, setUserName] = useState<string>("");
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const clientRef = useRef<Client | null>(null);
  const { rightSpace } = editorStore();
  const [connected, setConnected] = useState<boolean>(false);
  const [cookies] = useCookies(["token", "nickname"]);
  const [userId, setUserId] = useState<string>("");

  useEffect(() => {
    if (!rightSpace) {
      connect();
    }
  }, [rightSpace]);

  useEffect(() => {
    // userName을 cookies에서 가져온 nickname으로 초기화
    setUserName(cookies.nickname);

    if (!rightSpace) {
      connect();
      console.log("rightSpace");
    }
  }, [rightSpace, cookies.nickname]);

  const connect = async () => {
    if (clientRef.current === null) {
      // 웹 소켓 fallback (소켓 통신 멈췄을 때, http로도 메시지 전송 받을 수 있게 함)
      const socket = new WebSocket(import.meta.env.VITE_WEBSOCKET_URL);
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
    clientRef.current?.subscribe(`/sub/repo/${repoId}`, onMessageReceived);
    console.log("구독이 문제인가? 이거 나오면 구독은 문제 아닌 걸로");
    clientRef.current?.send(
      `/pub/chat/enter/${repoId}`,
      {},
      JSON.stringify({ sender: userName, type: "JOIN" })
    );
  };

  const onError = (error: any) => {
    console.error("연결 실패", error);
  };

  const sendMessage = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setCurrentMessage("");
    setUserId(cookies.token);
    setUserName(cookies.nickname);
    if (currentMessage.trim() && clientRef.current) {
      const chatMessage = {
        sender: userName,
        content: currentMessage,
        type: "CHAT",
        userId: cookies.token,
      };

      clientRef.current.send(`/pub/chat/send/${repoId}`, {}, JSON.stringify(chatMessage));
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
    <div className={styles.chattingWrapper}>
      <div className={styles.chattingSpace}>
        <div className={styles.chatHeader}></div>
        {!connected && (
          <div className={styles.messages} ref={messagesEndRef}>
            Connecting...
          </div>
        )}
        <ul className={styles.messageArea}>
          {messages.map((message, index) => (
            <li
              key={index}
              className={`${message.sender === userName ? styles.myMessage : styles.testMessage}`}
            >
              {message.type === "CHAT" && (
                <div
                  className={`${
                    message.sender === userName ? styles.mysenderWrapper : styles.senderWrapper
                  }`}
                >
                  <div
                    className={`${
                      message.sender === userName ? styles.mysenderName : styles.senderName
                    }`}
                  >
                    <strong>{message.sender}</strong>
                  </div>
                  <div className={styles.chat_bubble}>{message.content}</div>
                </div>
              )}
              <div className={styles.senderNoticeWrapper}>
                {message.type === "JOIN" && (
                  <div className={styles.senderEntranceNotice}>
                    {message.sender} 님이 참가했습니다.
                  </div>
                )}
                {message.type === "LEAVE" && (
                  <div className={styles.senderOutNotice}>{message.sender} 님이 퇴장했습니다.</div>
                )}
              </div>
            </li>
          ))}
        </ul>
        <form className={styles.messageForm} name="messageForm" onSubmit={sendMessage}>
          <input
            type="text"
            id="message"
            placeholder="Type a message..."
            autoComplete="off"
            className={styles.messageInput}
            value={currentMessage}
            onChange={(e) => setCurrentMessage(e.target.value)}
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
