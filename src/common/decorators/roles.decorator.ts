import { SetMetadata } from "@nestjs/common";
import { ROLES } from "../../auth";

export const Role = (...roles: ROLES[]) => SetMetadata("roles", roles);
