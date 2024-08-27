import { calculateAnnuityPayment } from "../utils/annuity";

type Body = {
  amount: number;
  duration: number;
  rate: number;
};

export default defineEventHandler<{ body: Body }>(async (event) => {
  const { amount, duration, rate } = await readBody(event);
  console.log(amount, duration, rate);
  //const annuity = amount * (rate / (1 - Math.pow(1 + rate, -duration)));
  const annuity = calculateAnnuityPayment(amount, rate, duration);
  return annuity;
});
