import { create } from 'zustand';
import type { IMyDetailTariff, IMyTariff } from '../dto/tariffs';
import { persist } from 'zustand/middleware';

interface UserTariffsState {
  userTariffs: IMyTariff[];
  setUserTariffs: (tariffs: IMyTariff[]) => void;
  detailTariff?: IMyDetailTariff;
  setDetailTariff?: (tariff: IMyDetailTariff) => void;
}

export const useUserTariffsStore = create<UserTariffsState>()(
  persist(
    (set) => ({
      userTariffs: [],
      detailTariff: undefined,
      setDetailTariff: (tariff) => set({ detailTariff: tariff }),
      setUserTariffs: (tariffs) => set({ userTariffs: tariffs }),
    }),
    { name: 'UserTariffsStore' },
  ),
);
