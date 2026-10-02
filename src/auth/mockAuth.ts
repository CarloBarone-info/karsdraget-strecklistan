import type { SessionUser } from "./authTypes";

const ADMIN_USERNAME = "Klubbis";
const ADMIN_PASSWORD = "kd1958";

export const mockMemberUser: SessionUser = {
  id: "member-593",
  memberId: 593,
  nickname: "Nori",
  role: "member",
};

const mockAdminUser: SessionUser = {
  id: "admin-klubbis",
  nickname: "Klubbmästaren",
  role: "admin",
};

export function loginAsAdmin(
  username: string,
  password: string,
): SessionUser | null {
  if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
    return mockAdminUser;
  }

  return null;
}
