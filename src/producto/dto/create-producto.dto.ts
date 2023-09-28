import { Prop } from "@nestjs/mongoose";

export class CreateProductoDto {
    @Prop({ required: true })
    nombre: string;
    precio: number;
    codigo_barra: number;
}
