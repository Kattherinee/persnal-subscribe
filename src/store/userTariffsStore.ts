import { create } from 'zustand';
import type { IMyDetailTariff, IMyTariff } from '../dto/tariffs';
import { persist } from 'zustand/middleware';
import { devtools } from 'zustand/middleware';

interface UserTariffsState {
  userTariffs: IMyTariff[];
  setUserTariffs: (tariffs: IMyTariff[]) => void;
  detailTariff?: IMyDetailTariff;
  setDetailTariff?: (tariff: IMyDetailTariff) => void;
}

export const useUserTariffsStore = create<UserTariffsState>()(
  devtools(
    persist(
      (set) => ({
        userTariffs: [],
        detailTariff: undefined,
        setDetailTariff: (tariff) => set({ detailTariff: tariff }, false, 'setDetailTariff'),
        setUserTariffs: (tariffs) => set({ userTariffs: tariffs }, false, 'setUserTariffs'),
      }),
      { name: 'UserTariffsStore' },
    ),
    { name: 'UserTariffsStore' },
  ),
);
