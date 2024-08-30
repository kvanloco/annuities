import { defineStore } from "pinia";
import type { AnnuityResult } from "@/types/types";

export const useAnnuityStore = defineStore("annuity", () => {
  const amount = ref<number>(100000);
  const rate = ref<number>(4);
  const duration = ref<number>(10);
  const start_date = ref<string>(new Date().toISOString().slice(0, 10));
  //const start_date = ref<Date>(new Date().toISOString().slice(0, 10));
  const annuityResult = ref<AnnuityResult[]>();

  const calculate = async () => {
    console.log("calculate from store");
    const annuityResults: AnnuityResult[] = await $fetch("/api/annuity", {
      method: "POST",
      body: {
        amount: amount.value,
        rate: rate.value,
        duration: duration.value,
        start_date: start_date.value,
      },
    });

    return (annuityResult.value = annuityResults);
  };

  return {
    amount,
    rate,
    duration,
    start_date,
    annuityResult,
    calculate,
  };
});
