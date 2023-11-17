import { IsString } from "class-validator";

export class CreateChatDto {
    @IsString()
    nombreEmisor: string;
    @IsString()
    emisorID: string;
    @IsString()
    receptorID: string;
    @IsString()
    mensaje: string;
}
