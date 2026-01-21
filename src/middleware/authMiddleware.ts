import { UserRoles } from "@/generated/prisma/enums";

export const authMiddleware = (...roles: UserRoles[]) => {
  return async (req: any, res: any, next: any) => {};
};
