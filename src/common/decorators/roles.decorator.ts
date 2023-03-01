import { SetMetadata } from "@nestjs/common";
import { Roles } from "../../auth";

export const Role = (...roles: Roles[]) => SetMetadata("roles", roles);
