export interface ITariff {
  id: string;
  title: string;
  price: number;
  features: string[];
}
export interface IMyTariff {
  id: string;
  title: string;
  price: number;
  accessKey: string;
  endDate: string;
  isActive: boolean;
}
export interface IMyDetailTariff {
  id: string;
  title: string;
  price: number;
  startDate: string;
  endDate: string;
  features: string[];
  usage: {
    today: number;
    limit: number;
  };
  isActive: boolean;
}
