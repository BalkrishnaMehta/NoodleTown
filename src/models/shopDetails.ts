export default interface ShopDetails {
  title: string;
  tags: string[];
  address: string;
  shopTiming: (number[] | null)[];
  averageOrderValue: number;
  typicalGroupSize: number;
  diningMenuImage: string;
  takeawayMenuImage: string;
}
