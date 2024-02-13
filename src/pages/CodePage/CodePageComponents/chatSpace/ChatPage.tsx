import React, { useState, useEffect, useRef } from "react";
import SockJS from "sockjs-client";
import Stomp, { Client } from "stompjs";
import "./ChatPage.css";

interface ChatMessage {
  sender: string;
  content: string;
  type: "JOIN" | "LEAVE" | "CHAT";
}

const ChatPage: React.FC = () => {
  const [username, setUsername] = useState<string>("");
  const [currentMessage, setCurrentMessage] = useState<string>("");
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [connected, setConnected] = useState<boolean>(false);
  const stompClient = useRef<Client | null>(null);
  const API_URL = import.meta.env.VITE_API_URL; // API URL은 어디로? http://localhost:8080?

  useEffect(() => {
    return () => {
      if (stompClient.current) {
        stompClient.current.disconnect(() => console.log("Stomp client disconnected"));
      }
    };
  }, []);

  const connect = () => {
    if (username.trim()) {
      const socket = new SockJS(`${API_URL}/ws`);
      stompClient.current = Stomp.over(socket);
      stompClient.current.connect({}, onConnected, onError);
    }
  };

  const onConnected = () => {
    setConnected(true);
    stompClient.current?.subscribe("/topic/public", onMessageReceived);
    stompClient.current?.send(
      "/app/chat.addUser",
      {},
      JSON.stringify({ sender: username, type: "JOIN" })
    );
  };

  const onError = (error: any) => {
    console.error(
      "Could not connect to WebSocket server. Please refresh this page to try again!",
      error
    );
  };

  const sendMessage = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (currentMessage.trim() && stompClient.current) {
      const chatMessage = {
        sender: username,
        content: currentMessage,
        type: "CHAT",
      };
      stompClient.current.send("/app/chat.sendMessage", {}, JSON.stringify(chatMessage));
      setCurrentMessage("");
    }
  };

  const onMessageReceived = (payload: any) => {
    const message: ChatMessage = JSON.parse(payload.body);
    setMessages((prevMessages) => [...prevMessages, message]);
  };

  return (
    <div id="chat-page" className={!connected ? "hidden" : ""}>
      <div className="chat-container">
        <div className="chat-header">
          <h2>Spring WebSocket Chat Demo</h2>
        </div>
        {!connected && <div className="connecting">Connecting...</div>}
        <ul id="messageArea">
          {messages.map((message, index) => (
            <li key={index} className={message.type === "CHAT" ? "chat-message" : "event-message"}>
              {message.type === "CHAT" && (
                <>
                  <strong>{message.sender}</strong>: {message.content}
                </>
              )}
              {message.type !== "CHAT" && <em>{message.content}</em>}
            </li>
          ))}
        </ul>
        <form id="messageForm" name="messageForm" onSubmit={sendMessage}>
          <div className="form-group">
            <div className="input-group clearfix">
              <input
                type="text"
                id="message"
                placeholder="Type a message..."
                autoComplete="off"
                className="form-control"
                value={currentMessage}
                onChange={(e) => setCurrentMessage(e.target.value)}
              />
              <button type="submit" className="primary">
                Send
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ChatPage;
