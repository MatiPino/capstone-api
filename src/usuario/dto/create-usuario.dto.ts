import { IsOptional, IsString } from "class-validator";

export class CreateUsuarioDto {
  @IsOptional()
  _id: string;
  @IsString()
  nombre: string;
  @IsString()
  apellido: string;
  @IsString()
  rol: string;

}
