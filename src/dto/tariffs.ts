export interface ITariff {
  id: string;
  title: string;
  price: string;
  features: string[];
}
export interface IMyTariff {
  id: string;
  title: string;
  price: string;
  accessKey: string;
  endDate: string;
  isActive: boolean;
}
export interface IMyDetailTariff {
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
