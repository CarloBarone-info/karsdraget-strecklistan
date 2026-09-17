import type { DashboardStats, Streck } from "../types/domain";

export function getDashboardStats(strecks: Streck[]): DashboardStats {
  return {
    streckCount: strecks.length,
    totalSpendOre: strecks.reduce((sum, streck) => sum + streck.priceOre, 0),
    activeMembers: new Set(strecks.map((streck) => streck.memberId)).size,
  };
}

export function formatCurrency(amountOre: number): string {
  return new Intl.NumberFormat("sv-SE", {
    style: "currency",
    currency: "SEK",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amountOre / 100);
}
