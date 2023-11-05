import { IsNumber, IsString } from "class-validator";

export class CreateProveedorDto {
    @IsString()
    nombre: string;
    @IsNumber()
    telefono: number;
    @IsString()
    descripcion: string;
    @IsString()
    correo: string;
}
