import { defineStore } from "pinia";
import type { AnnuityResult, InputProps } from "@/types/types";

export const useAnnuityStore = defineStore("annuity", () => {
  const amount = ref<number>(100000);
  const rate = ref<number>(4);
  const duration = ref<number>(10);
  const start_date = ref<string>(new Date().toISOString().slice(0, 10));
  const name = ref<string>("");
  //const start_date = ref<Date>(new Date().toISOString().slice(0, 10));
  //const annuityResult = ref<AnnuityResult>();

  const calculate = async (values: InputProps) => {
    console.log("calculate from store, values: ", values);
    const { data: annuityResult, error } = await $fetch("/api/annuity", {
      method: "POST",
      body: {
        amount: values.loan_amount,
        rate: values.interest_rate_year,
        duration: values.periods_years,
        start_date: values.start_date,
        // amount: 100000,
        // rate: 6,
        // duration: 10,
        // start_date: "2021-01-01",
      },
    });
    if (error) {
      console.log("error", error);
    }
    console.log(annuityResult);
    return annuityResult;
  };

  return {
    amount,
    rate,
    duration,
    start_date,
    calculate,
  };
});
