import type { PlanData } from '../pages/auth/PlanDetailPage';

export const mockPlan: PlanData = {
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
