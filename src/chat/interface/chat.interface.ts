import { Document } from "mongoose";

export interface ChatMessage {
    emisorID: string;
    mensaje: string;
    enviadoPorEmisor: boolean;
    createdAt: Date;
  }
  
  export interface Chat extends Document {
    chatID: string;
    favorito: boolean;
    mensajes: ChatMessage[];
  }