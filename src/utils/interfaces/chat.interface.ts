import { UserDetails } from "../types";

export interface Message {
    user: UserDetails;
    timeSent: string;
    message: string;
  }

  
  // Interface for when server emits events to clients.
  export interface ServerToClientEvents {
    chat: (e: Message) => void;
  }
  
  // Interface for when clients emit events to the server.
  export interface ClientToServerEvents {
    chat: (e: Message) => void;
}


  