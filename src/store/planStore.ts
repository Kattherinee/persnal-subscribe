import { create } from 'zustand';
import type { IMyDetailTariff } from '../dto/tariffs';
import { devtools } from 'zustand/middleware';

interface PlanState {
  plan: IMyDetailTariff | null;
  setPlan: (plan: IMyDetailTariff | null) => void;
}

export const usePlanStore = create(
  devtools<PlanState>((set) => ({
    plan: null,
    setPlan: (plan) => set({ plan }),
  })),
);
