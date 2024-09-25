import { calculateAnnuityPayment } from "../utils/annuityCalculator";
import type { AnnuityResult } from "@/types/types";
type Body = {
  amount: number;
  duration: number;
  rate: number;
  start_date: Date;
};

export default defineEventHandler<{ body: Body }>(async (event) => {
  //const { amount, duration, rate, start_date } = await readBody(event);
  //console.log("body: ", amount, duration, rate, start_date);
  const body = await readBody(event);
  console.log("body: ", body);
  //const annuity = amount * (rate / (1 - Math.pow(1 + rate, -duration)));

  const parameters = {
    loan_amount: body.amount,
    interest_rate: body.rate,
    number_of_periods: body.duration,
    start_date: body.start_date ? new Date(body.start_date) : new Date(),
  };
  console.log("parameters: ", parameters);

  const annuity: AnnuityResult = calculateAnnuityPayment(
    body.amount,
    body.rate,
    body.duration,
    body.start_date ? new Date(body.start_date) : new Date()
  );

  return annuity;
});
