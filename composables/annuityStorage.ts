import { v4 as uuidv4 } from "uuid";
import type { AnnuityResultWithId, AnnuityResult } from "@/types/types";

export function useAnnuityStorage() {
  const getAnnuityItems = () => {
    const items: AnnuityResultWithId[] = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key?.startsWith("annuity")) {
        const item = localStorage.getItem(key);
        if (item) {
          const item2 = JSON.parse(item);
          items.push({
            ...item2,
            id: key,
            start_date: new Date(item2.input_parameters.start_date),
          });
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
