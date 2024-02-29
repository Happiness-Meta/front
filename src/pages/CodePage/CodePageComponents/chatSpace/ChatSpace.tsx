import styles from "./ChatSpace.module.css";
import Stomp, { Client } from "stompjs";
import { useEffect, useRef, useState } from "react";
import { useCookies } from "react-cookie";
import { useParams } from "react-router-dom";
import userAxiosWithAuth from "@/utils/useAxiosWIthAuth";
import editorStore from "@/store/CodePageStore/editorStore";
import useChatStore from "@/store/chatSpaceStore/chatStore";
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
  const { rightSpace, setRightSpace } = editorStore();
  const {
    currentMessage,
    setCurrentMessage,
    userName,
    setUserName,
    nowExistUser,
    setNowExistUser,
  } = useChatStore();
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [initialDataLoaded, setInitialDataLoaded] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [cookies] = useCookies(["token", "nickname"]);
  const messagesEndRef = useRef<HTMLUListElement | null>(null);
  const clientRef = useRef<Client | null>(null);
  const API_URL = import.meta.env.VITE_WEBSOCKET_URL;
  const messageRefs = useRef<(HTMLLIElement | null)[]>([]);

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

  //웹소켓 연결 , 구독하는 함수
  const onConnected = () => {
    if (!messages.some((m) => m.sender === nowExistUser)) {
      clientRef.current?.send(
        `/pub/chat/enter/${repoId}`,
        {},
        JSON.stringify({ sender: userName, type: "JOIN" })
      );
      setNowExistUser(userName);
    }
    clientRef.current?.subscribe(`/sub/repo/${repoId}`, onMessageReceived);
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

      setCurrentMessage("");
    }
  };

  const onMessageReceived = (payload: StompMessagePayload) => {
    const message: ChatMessage = JSON.parse(payload.body);
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
