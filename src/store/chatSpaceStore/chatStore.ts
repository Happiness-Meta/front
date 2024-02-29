import { create } from "zustand";

export interface ChatMessage {
  sender: string;
  content: string;
  type: "JOIN" | "LEAVE" | "CHAT";
}

interface aboutChatStore {
  messages: ChatMessage[];
  setMessages: (messages: ChatMessage[]) => void;
  currentMessage: string;
  setCurrentMessage: (message: string) => void;
  addMessage: (newMessage: ChatMessage) => void;
  userName: string;
  setUserName: (name: string) => void;
  nowExistUser: string;
  setNowExistUser: (user: string) => void;
}

const useChatStore = create<aboutChatStore>((set) => ({
  messages: [],
  setMessages: (messages: ChatMessage[]) => set({ messages }),
  currentMessage: "",
  setCurrentMessage: (message) => set({ currentMessage: message }),
  addMessage: (newMessage) => set((state) => ({ messages: [...state.messages, newMessage] })),
  userName: "",
  setUserName: (name) => set({ userName: name }),
  nowExistUser: "",
  setNowExistUser: (user) => set({ nowExistUser: user }),
}));

export default useChatStore;
