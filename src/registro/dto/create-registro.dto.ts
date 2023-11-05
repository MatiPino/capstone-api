import { IsArray, IsBoolean, IsNumber, IsString } from "class-validator";

export class CreateRegistroDto {
  @IsArray()
  productos: string[];

  @IsNumber()
  total: number;

  @IsBoolean()
  tipo: boolean;

  @IsString()
  comercio: string;
}
