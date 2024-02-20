import React, {useState, useEffect, useRef} from "react";
// import SockJS from "sockjs-client";
// import * as StompJS from "@stomp/stompjs";

import styles from "./ChatPage.module.css";
import Stomp, {Client} from "stompjs";

interface ChatMessage {
    sender: string;
    content: string;
    type: "JOIN" | "LEAVE" | "CHAT";
}

const ChatPage: React.FC = () => {
    const [userName, setUserName] = useState<string>("");
    const [currentMessage, setCurrentMessage] = useState<string>("");
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [connected, setConnected] = useState<boolean>(false);
    let clientRef = useRef<Client | null>(null);

    const connect = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (clientRef.current === null) {
            // 웹 소켓 fallback (소켓 통신 멈췄을 때, http로도 메시지 전송 받을 수 있게함)
            const socket = new WebSocket(/*SockJS*/ "ws://43.203.92.111:8080/ws");
            const client = Stomp.over(socket);
            console.log("여기까지는 오게 됨");
            client.connect({}, onConnected, onError);
            clientRef.current = client;
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
            JSON.stringify({sender: userName, type: "JOIN"})
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
            };
            clientRef.current.send("/pub/chat.sendMessage", {}, JSON.stringify(chatMessage));
            setCurrentMessage("");
        }
    };

    const onMessageReceived = (payload: any) => {
        const message: ChatMessage = JSON.parse(payload.body);
        setMessages((prevMessages) => [...prevMessages, message]);
    };

    return (
        <div id="chat-page">
            <div className="chat-container">
                <form onSubmit={connect}>
                    <input
                        style={{color: "black"}}
                        type="text"
                        id="nickname"
                        placeholder="input nickname"
                        autoComplete="off"
                        value={userName}
                        onChange={(e) => setUserName(e.target.value)}
                    />
                    <button type="submit" className="primary" style={{color: "black"}}>
                        start chatting
                    </button>
                </form>
                <div className="chat-header">
                    <h2>Spring WebSocket Chat Demo</h2>
                </div>
                {!connected && <div className="connecting">Connecting...</div>}
                <ul id="messageArea">
                    {messages.map((message, index) => (
                        <li
                            key={index}
                            className={message.type === "CHAT" ? styles.chat_message : styles.event_message}
                        >
                            {message.type === "CHAT" && (
                                <>
                                    <strong>{message.sender}</strong> : {message.content}
                                </>
                            )}
                            {message.type !== "CHAT" && <em>{message.sender} 참가/퇴장했습니다.</em>}
                        </li>
                    ))}
                </ul>
                <form id="messageForm" name="messageForm" onSubmit={sendMessage}>
                    <input
                        style={{color: "black"}}
                        type="text"
                        id="message"
                        placeholder="Type a message..."
                        autoComplete="off"
                        className="form-control"
                        value={currentMessage}
                        onChange={(e) => setCurrentMessage(e.target.value)}
                    />
                    <button type="submit" className="primary" style={{color: "black"}}>
                        Send
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ChatPage;
