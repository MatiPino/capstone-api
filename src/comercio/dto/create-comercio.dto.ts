import { IsOptional, IsString } from "class-validator";

export class CreateComercioDto {
  @IsString()
  nombre: string;

  @IsString()
  direccion: string;

  @IsString()
  telefono: string;

  @IsString()
  propietario: string;

  @IsOptional()
  productos: string[];

  @IsOptional()
  registros: string[];
}
