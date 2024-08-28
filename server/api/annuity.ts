import { calculateAnnuityPayment } from "../utils/annuityCalculator";

type Body = {
  amount: number;
  duration: number;
  rate: number;
  start_date?: Date;
};

export default defineEventHandler<{ body: Body }>(async (event) => {
  const { amount, duration, rate, start_date } = await readBody(event);
  console.log(amount, duration, rate, start_date);
  //const annuity = amount * (rate / (1 - Math.pow(1 + rate, -duration)));

  const annuity = calculateAnnuityPayment(
    Number(amount),
    Number(rate),
    Number(duration),
    start_date ? start_date : undefined
  );

  return annuity;
});
