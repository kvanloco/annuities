import dayjs from "dayjs";
import type {
  InputParameters,
  AnnuityInfo,
  AnnuityTable,
  AnnuityResult,
} from "@/types/types";

dayjs().format();
/**
 * Calculate the annuity from given parameters
 *
 *
 */

/*
// START PARAMETERS
const loan_amount: number = 150000;
const period_years: number = 2;
const interest: number = 8;
const start_date = dayjs('2018-04-01');
*/
// HELPER FUNCTIONS
let toEuro = new Intl.NumberFormat("be-BE", {
  style: "currency",
  currency: "EUR",
});

const interest_month = (interest_year: number): number => {
  return (1 + interest_year / 100) ** (1 / 12) - 1;
};

const period_months = (period_years: number): number => {
  return period_years * 12;
};

/*
// local test
const annuity = calculateAnnuityPayment(
  loan_amount,
  interest_month(interest) * 100,
  period_months(period_years)
);
console.log('%c Test', 'color:yellow; font-size:20px');
console.log(annuity);
*/
export function calculateAnnuityPayment(
  loan_amount: number,
  interest_rate: number,
  number_of_periods: number,
  start_date: Date
): AnnuityResult {
  const r = interest_month(interest_rate); // Convert interest rate to a decimal

  //const r = 0.25;
  const annuity_per_month =
    (r / (1 - Math.pow(1 + r, -period_months(number_of_periods)))) *
    loan_amount;

  const total_pay_off = period_months(number_of_periods) * annuity_per_month;
  const total_interest = loan_amount - total_pay_off;
  const cost_per_year = annuity_per_month * 12;

  const input_parameters = {
    loan_amount: loan_amount,
    periods_years: number_of_periods,
    periods_months: period_months(number_of_periods),
    interest_rate_year: interest_rate,
    interest_rate_month: interest_month(interest_rate) * 100,
    start_date: start_date,
  };
  console.log("Input Parameters", input_parameters);
  //console.log("%c Input Parameters", "color:yellow; font-size:20px");
  //console.table(input_parameters);

  const annuity_info: AnnuityInfo = {
    annuity_per_month: annuity_per_month,
    total_payoff: total_pay_off,
    interest_cost: -total_interest,
    annuity_per_year: cost_per_year,
  };
  //console.log("%c Annuity info", "color:yellow; font-size:20px");
  //console.table(annuity_info);

  //let arr = new Array(period_years * 12);
  let arr = [...Array(number_of_periods * 12)].fill(0);

  const annuity_table: AnnuityTable = arr.reduce((prev, curr, index, array) => {
    const currPeriod = index + 1;
    const currTime = dayjs(start_date).add(index, "month");
    if (index == 0) {
      return [
        ...prev,
        {
          period: currPeriod,
          time: currTime,
          annuity: annuity_per_month,
          interest: loan_amount * interest_month(interest_rate),
          capital:
            annuity_per_month - loan_amount * interest_month(interest_rate),
          rest: total_pay_off - annuity_per_month,
          total_payed: annuity_per_month,
        },
      ];
    } else {
      const prevLastItem = prev.slice(-1)[0];
      const interest1 = prevLastItem.rest * interest_month(interest_rate);
      const capital1 = annuity_per_month - interest1;
      const rest1 = prevLastItem.rest - annuity_per_month;
      const total1 = annuity_per_month + prevLastItem.total_payed;
      return [
        ...prev,
        {
          period: currPeriod,
          time: currTime,
          annuity: annuity_per_month,
          interest: interest1,
          capital: capital1,
          rest: rest1,
          total_payed: total1,
        },
      ];
    }
  }, []);
  //console.log("%c Annuity Table", "color:yellow; font-size:20px");
  //console.table(annuity_table);
  return {
    input_parameters: input_parameters,
    annuity_info: annuity_info,
    annuity_table: annuity_table,
  };
}
