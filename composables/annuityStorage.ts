import { v4 as uuidv4 } from "uuid";
import type { AnnuityResultWithId, AnnuityResult } from "@/types/types";

export function useAnnuityStorage() {
  const annuityInLocalStorage = ref(null);

  const getAnnuityItems = () => {
    const items: AnnuityResultWithId[] = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key?.startsWith("annuity")) {
        const item = localStorage.getItem(key);
        if (item) {
          const item2 = JSON.parse(item);
          items.push({ ...item2, id: key });
        }
      }
    }

    return items;
  };

  const saveAnnuityItem = (item: AnnuityResult) => {
    // save to storage
    const uniqueKey = uuidv4();
    const prefix = "annuity-";
    const key = prefix + uniqueKey;
    //state.value = { ...state.value, count: state.value.count + 1 };
    //console.log("state", state.value);
    localStorage.setItem(key, JSON.stringify(item));
  };
  const deleteAnnuityItem = (id: string) => {
    localStorage.removeItem(id);
  };

  return {
    getAnnuityItems,
    saveAnnuityItem,
    deleteAnnuityItem,
  };
}
