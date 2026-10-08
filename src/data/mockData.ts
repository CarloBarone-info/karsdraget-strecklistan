import type {
  Member,
  OrchestraSection,
  Product,
  Streck,
} from "../types/domain";

export const mockSections: OrchestraSection[] = [
  { id: "saxofon", name: "Saxofon", active: true },
  { id: "floj", name: "Flöjt", active: true },
  { id: "klarinett", name: "Klarinett", active: true },
  { id: "komp", name: "Komp", active: true },
  { id: "trombon", name: "Trombon", active: true },
  { id: "trattar-omkull", name: "Trattar omkull", active: true },
  { id: "trumpet", name: "Trumpet", active: true },
  { id: "karsetten", name: "Kårsetten", active: true },
];

export const mockMembers: Member[] = [
  { id: 534, nickname: "Toddy", sectionIds: ["komp"], active: true },
  { id: 551, nickname: "Mr Zippy", sectionIds: ["saxofon"], active: true },
  { id: 560, nickname: "Slickepott", sectionIds: ["klarinett"], active: true },
  { id: 593, nickname: "Nori", sectionIds: ["karsetten"], active: true },
  { id: 488, nickname: "Hurrà!!!", sectionIds: ["klarinett"], active: true },
  { id: 462, nickname: "Christian", sectionIds: ["klarinett"], active: true },
];

export const mockProducts: Product[] = [
  { id: "beer", name: "Öl", priceOre: 2000, active: true },
  { id: "cider", name: "Cider", priceOre: 2000, active: true },
  { id: "wine", name: "Vin", priceOre: 3000, active: true },
  { id: "soda", name: "Läsk", priceOre: 1000, active: true },
];

export const mockStrecks: Streck[] = [
  {
    id: 1,
    memberId: 593,
    productId: "beer",
    priceOre: 2000,
    createdAt: "2026-09-16T22:24:00+02:00",
  },
  {
    id: 2,
    memberId: 560,
    productId: "cider",
    priceOre: 2000,
    createdAt: "2026-09-16T22:19:00+02:00",
  },
  {
    id: 3,
    memberId: 534,
    productId: "soda",
    priceOre: 1000,
    createdAt: "2026-09-16T22:12:00+02:00",
  },
  {
    id: 4,
    memberId: 551,
    productId: "wine",
    priceOre: 3000,
    createdAt: "2026-09-16T22:03:00+02:00",
  },
  {
    id: 5,
    memberId: 462,
    productId: "beer",
    priceOre: 2000,
    createdAt: "2026-09-16T21:57:00+02:00",
  },
  {
    id: 6,
    memberId: 488,
    productId: "beer",
    priceOre: 2000,
    createdAt: "2026-09-16T21:51:00+02:00",
  },
];
