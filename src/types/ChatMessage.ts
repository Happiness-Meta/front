export interface receiveMessageType {
  receive: ChatMessage[];
}

export interface ChatMessage {
  type: string;
  content: string;
  sender: string;
  userId: string;
}
