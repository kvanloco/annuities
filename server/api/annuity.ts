export default defineEventHandler(async (event) => {
  const { amount, duration, rate } = await readBody(event);
  console.log(amount, duration, rate);
  const annuity = amount * (rate / (1 - Math.pow(1 + rate, -duration)));

  return annuity;
});
