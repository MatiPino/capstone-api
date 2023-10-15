import { IsNumber, IsOptional, IsString } from "class-validator";

export class CreateProductoDto {
  @IsString()
  nombre: string;
  @IsNumber()
  precio: number;
  @IsString()
  codigo_barra: string;

  @IsOptional()
  imagenes: string[];
  @IsOptional()
  proveedor: string;
  @IsString()
  comercio: string;
}
