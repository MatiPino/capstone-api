import { IsBoolean, IsString } from "class-validator";

// export class CreateChatDto {
//     @IsString()
//     nombreEmisor: string;
//     @IsString()
//     emisorID: string;
//     @IsString()
//     receptorID: string;
//     @IsString()
//     mensaje: string;
// }

export class CreateChatDto {
    @IsString()
    emisorID: string;
  
    @IsString()
    mensaje: string;
  
    @IsBoolean()
    enviadoPorEmisor: boolean;
  
    @IsString()
    chatID: string;
  }