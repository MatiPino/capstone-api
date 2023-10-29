import { SetMetadata } from "@nestjs/common";
import { Rol as RolEnum } from "../.enums/rol.enum";

export const ROL_KEY = "roles";

export const Rol = (...roles: RolEnum[]) => SetMetadata(ROL_KEY, roles);
