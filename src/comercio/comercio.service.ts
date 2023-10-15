import { Injectable } from "@nestjs/common";
import { CreateComercioDto } from "./dto/create-comercio.dto";
import { UpdateComercioDto } from "./dto/update-comercio.dto";

@Injectable()
export class ComercioService {
  create(createComercioDto: CreateComercioDto) {
    return "This action adds a new comercio";
  }

  findAll() {
    return `This action returns all comercio`;
  }

  findOne(id: number) {
    return `This action returns a #${id} comercio`;
  }

  update(id: number, updateComercioDto: UpdateComercioDto) {
    return `This action updates a #${id} comercio`;
  }

  remove(id: number) {
    return `This action removes a #${id} comercio`;
  }
}
