import { Document } from "mongoose";

// export interface Chat extends Document {
//     nombreEmisor: string;
//     emisorID: string;
//     receptorID: string;
//     mensaje: string;
//     createdAt: Date;
// }

export interface ChatMessage {
    emisorID: string;
    mensaje: string;
    enviadoPorEmisor: boolean;
    createdAt: Date;
  }
  
  export interface Chat extends Document {
    chatID: string;
    mensajes: ChatMessage[];
  }