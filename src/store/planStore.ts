import { create } from 'zustand';
import type { MyDetailTariff } from '../dto/tariffs';
import { devtools } from 'zustand/middleware';

interface PlanState {
  plan: MyDetailTariff | null;
  setPlan: (plan: MyDetailTariff | null) => void;
}

export const usePlanStore = create(
  devtools<PlanState>((set) => ({
    plan: null,
    setPlan: (plan) => set({ plan }),
  })),
);
