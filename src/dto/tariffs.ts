export interface Tariff {
  id: string;
  title: string;
  price: string;
  features: string[];
}
export interface MyTariff {
  id: string;
  title: string;
  price: string;
  endDate: string;
  isActive: boolean;
}
export interface MyDetailTariff {
  id: string;
  title: string;
  price: string;
  startDate: string;
  endDate: string;
  features: string[];
  usage: {
    today: number;
    limit: number;
  };
  isActive: boolean;
}
