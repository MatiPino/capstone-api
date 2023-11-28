import { IsBoolean, IsString } from "class-validator";

export class CreateChatDto {
    @IsString()
    emisorID: string;
  
    @IsString()
    mensaje: string;
  
    @IsBoolean()
    enviadoPorEmisor: boolean;
  
    @IsString()
    chatID: string;

    @IsBoolean()
    favorito: boolean;
  }