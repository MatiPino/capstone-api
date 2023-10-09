import { IsString } from "class-validator";

export class CreateUsuarioDto {
  @IsString()
  nombre: string;
  @IsString()
  apellido: string;
  @IsString()
  rol: string;
}
