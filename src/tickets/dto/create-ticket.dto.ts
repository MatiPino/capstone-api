import { IsOptional, IsString } from "class-validator";

export class CreateTicketDto {
    @IsString()
    ticketsID: string;
    
    @IsString()
    asunto: string;
    
    @IsString()
    descripcion: string;
    
    @IsString()
    estado: boolean;
    
    @IsString()
    usuarioID: string;
    
    @IsOptional()
    adminID: string;
    
    @IsOptional()
    archivo: Buffer;
}
