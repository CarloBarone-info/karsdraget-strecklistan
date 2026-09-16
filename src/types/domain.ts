export type Member = {
  id: number;
  nickname: string;
  active: boolean;
};

export type Product = {
  id: string;
  name: string;
  priceOre: number;
  active: boolean;
};

export type Streck = {
  id: number;
  memberId: Member["id"];
  productId: Product["id"];
  priceOre: number;
  createdAt: string;
};

export type DashboardStats = {
  streckCount: number;
  totalSpendOre: number;
  activeMembers: number;
};
