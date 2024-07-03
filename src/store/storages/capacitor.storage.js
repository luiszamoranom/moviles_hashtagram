import { createJSONStorage } from "zustand/middleware";
import { Preferences } from '@capacitor/preferences';

const storageApi = {
  getItem: async function (name) {
    const item = await Preferences.get( { key: name } );
    return item.value ? JSON.parse(item.value) : null;
  },
  setItem: async function (name, value) {
    await Preferences.set({
      key: name, 
      value: JSON.stringify(value)
    });
  },
  removeItem: async function (name) {
    await Preferences.remove({ key: name });
  },
};

export const customCapacitorStorage = createJSONStorage(() => storageApi);