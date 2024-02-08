export interface receiveMessageType {
  receive: ChatMessage[];
}

export interface ChatMessage {
  type: string;
  email: string;
  userImg: string;
  containerId: string;
  content: string;
  sender: string;
}
