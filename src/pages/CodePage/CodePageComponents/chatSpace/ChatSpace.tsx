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
}

interface SearchResult {
  index: number;
  sender: string;
  content: string;
  type: "JOIN" | "LEAVE" | "CHAT";
}

interface StompMessagePayload {
  body: string;
}

function ChatSpace() {
  const { repoId } = useParams();
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const { rightSpace, setRightSpace } = editorStore();
  const [currentMessage, setCurrentMessage] = useState<string>("");
  const [userName, setUserName] = useState<string>("");
  const [cookies] = useCookies(["token", "nickname"]);
  const messagesEndRef = useRef<HTMLUListElement | null>(null);
  const clientRef = useRef<Client | null>(null);
  const [initialDataLoaded, setInitialDataLoaded] = useState(false);
  const [nowExistUser, setNowExistUser] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const API_URL = import.meta.env.VITE_WEBSOCKET_URL;
  const messageRefs = useRef<(HTMLLIElement | null)[]>([]);
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);

  const requestChatInitialData = async () => {
    try {
      const response = await userAxiosWithAuth.get(`/api/chat/${repoId}/messages`);
      setMessages((prevMessages) => [...prevMessages, ...response.data.results]);

      setInitialDataLoaded(true);
    } catch (error) {
      console.error("requestChatInitialData:", error);
    }
  };

  //search
  const handleSearchSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSearchTerm("");
  };
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  //rightspace 언제나 닫힌 상태로 불러오기
  useEffect(() => {
    setRightSpace();
  }, []);

  useEffect(() => {
    // userName을 cookies에서 가져온 nickname으로 초기화
    setUserName(cookies.nickname);

    onConnected();
    if (!rightSpace) {
      connect();
    }
  }, [rightSpace, userName]);

  useEffect(() => {
    if (!initialDataLoaded) {
      requestChatInitialData();
    }
  }, [repoId, initialDataLoaded]);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollTop = messagesEndRef.current.scrollHeight;
    }
  }, [messages]);

  //검색

  useEffect(() => {
    if (searchTerm) {
      const results = messages
        .map((message, index) => ({ ...message, index }))
        .filter((message) =>
          (message.content || "") // message.content가 null이나 undefined인 경우 빈 문자열로 대체
            .toLowerCase()
            .includes(searchTerm.toLowerCase())
        );
      setSearchResults(results);
    } else {
      setSearchResults([]);
    }
  }, [searchTerm, messages]);

  //검색 결과로 이동

  const scrollToMessage = (index: number) => {
    messageRefs.current[index]?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  useEffect(() => {
    if (searchResults.length > 0) {
      scrollToMessage(searchResults[0].index);
    }
  }, [searchResults]);

  const connect = () => {
    if (clientRef.current === null) {
      // 웹 소켓 fallback (소켓 통신 멈췄을 때, http로도 메시지 전송 받을 수 있게 함)
      const socket = new WebSocket(API_URL);
      const client = Stomp.over(socket);
      client.connect({}, onConnected, onError);
      clientRef.current = client;
    }
  };

  const onConnected = () => {
    console.log("웹소켓 연결 완료");

    if (!messages.some((m) => m.sender === nowExistUser)) {
      clientRef.current?.send(
        `/pub/chat/enter/${repoId}`,
        {},
        JSON.stringify({ sender: userName, type: "JOIN" })
      );
      setNowExistUser(userName);
      console.log("지금 있는 유저:", nowExistUser);
    }
    clientRef.current?.subscribe(`/sub/repo/${repoId}`, onMessageReceived);
    console.log("구독 완료");
  };

  const onError = (error: any) => {
    console.error("연결 실패", error);
  };

  const sendMessage = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // setUserName(cookies.nickname);
    if (currentMessage.trim() && clientRef.current) {
      const chatMessage = {
        sender: userName,
        content: currentMessage,
        type: "CHAT",
      };
      clientRef.current?.send(`/pub/chat/send/${repoId}`, {}, JSON.stringify(chatMessage));
      console.log("클라이언트 메시지 전송 메서드 내부 유저아이디:", userName);
      console.log("클라이언트 메시지 전송 메서드 내부 메시지 리스트", messages);
      setCurrentMessage("");
    }
  };

  const onMessageReceived = (payload: StompMessagePayload) => {
    const message: ChatMessage = JSON.parse(payload.body);
    // console.log("방금 받아낸 메시지", message);
    setMessages((prevMessages) => [...prevMessages, message]);
  };

  return (
    <div className={styles.chattingWrapper}>
      <div className={styles.chattingSpace}>
        <div className={styles.chatHeader}>
          <form onSubmit={handleSearchSubmit}>
            <input
              type="text"
              className={styles.chatHeaderInput}
              placeholder="Search..."
              value={searchTerm}
              onChange={handleSearchChange}
            ></input>
          </form>
        </div>

        <ul className={styles.messageArea} ref={messagesEndRef}>
          {messages.map((message, index) => (
            <li
              key={index}
              className={
                message.type === "CHAT"
                  ? message.sender === userName
                    ? styles.myMessage
                    : styles.testMessage
                  : styles.noticeMessage
              }
              ref={(el) => (messageRefs.current[index] = el)}
            >
              {message.type === "CHAT" ? (
                <>
                  <div
                    className={
                      message.sender === userName ? styles.mysenderWrapper : styles.senderWrapper
                    }
                  >
                    <div
                      className={
                        message.sender === userName ? styles.mysenderName : styles.senderName
                      }
                    >
                      <strong>{message.sender}</strong>
                    </div>
                    <div
                      className={`${
                        searchResults.find((result) => result.index === index)
                          ? message.sender === userName
                            ? styles.searchResultMessage // 현재 사용자가 보낸 검색 결과 메시지 스타일
                            : styles.searchResultOtherMessage // 다른 사용자가 보낸 검색 결과 메시지 스타일
                          : styles.chat_bubble
                      }`}
                    >
                      {message.content}
                    </div>
                  </div>
                </>
              ) : (
                <div className={styles.noticeMessage}>
                  <div className={styles.senderNoticeWrapper}>
                    {message.type === "JOIN" && messages.some((m) => m.sender === nowExistUser) ? (
                      <div className={styles.senderEntranceNotice}>
                        {message.sender} 님이 참가했습니다.
                      </div>
                    ) : (
                      <></>
                    )}
                    {message.type === "LEAVE" && (
                      <div className={styles.senderOutNotice}>
                        {message.sender} 님이 퇴장했습니다.
                      </div>
                    )}
                  </div>
                </div>
              )}
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
