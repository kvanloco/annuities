import { calculateAnnuityPayment } from "../utils/annuityCalculator";

type Body = {
  amount: number;
  duration: number;
  rate: number;
};

export default defineEventHandler<{ body: Body }>(async (event) => {
  const { amount, duration, rate } = await readBody(event);
  console.log(amount, duration, rate);
  //const annuity = amount * (rate / (1 - Math.pow(1 + rate, -duration)));
  const annuity = calculateAnnuityPayment(
    Number(amount),
    Number(rate),
    Number(duration)
  );

  return annuity;
});
