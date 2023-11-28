import { IsNumber, IsOptional, IsString } from "class-validator";

export class CreatePublicacionDto {
  @IsString()
  nombre: string;
  @IsNumber()
  precio: number;
  @IsString()
  codigo_barra: string;
  @IsString()
  categoria: string;
  @IsString()
  proveedor: string;

  @IsOptional()
  imagen: string;
}
