import type { MyDetailTariff } from '../dto/tariffs';

export const mockPlans: MyDetailTariff[] = [
  {
    id: '111',
    title: 'Базовый',
    price: '999 ₽/мес',
    startDate: '2024-01-15',
    endDate: '2024-03-15',
    features: ['API доступ', '1000 запросов/день', 'Email поддержка'],
    usage: {
      today: 247,
      limit: 1000,
    },
    isActive: true,
  },
  {
    id: '222',
    title: 'Премиум',
    price: '2899 ₽/мес',
    startDate: '2024-01-15',
    endDate: '2024-03-15',
    features: ['API доступ', '1000 запросов/день', 'Email поддержка', 'b tot [htym'],
    usage: {
      today: 247,
      limit: 1000,
    },
    isActive: false,
  },
];
export const mockPlanActive: MyDetailTariff = {
  id: '111',
  title: 'Базовый',
  price: '999 ₽/мес',
  startDate: '2024-01-15',
  endDate: '2024-03-15',
  features: ['API доступ', '1000 запросов/день', 'Email поддержка'],
  usage: {
    today: 247,
    limit: 1000,
  },
  isActive: true,
};
export const mockPlanDisAbled: MyDetailTariff = {
  id: '222',
  title: 'Премиум',
  price: '2899 ₽/мес',
  startDate: '2024-01-15',
  endDate: '2024-03-15',
  features: ['API доступ', '1000 запросов/день', 'Email поддержка', 'b tot [htym'],
  usage: {
    today: 247,
    limit: 1000,
  },
  isActive: false,
};
