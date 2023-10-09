import { IsString } from "class-validator";

export class CreateAutenticacionDto {
  @IsString()
  rut: string;
  @IsString()
  contrasena: string;
}
