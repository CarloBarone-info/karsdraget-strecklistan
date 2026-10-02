export type UserRole = "member" | "admin";

export type SessionUser = {
  id: string;
  nickname: string;
  role: UserRole;
  memberId?: number;
};
