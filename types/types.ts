export type InputParameters = {
  loan_amount: number;
  periods_years: number;
  periods_months: number;
  interest_rate_year: number;
  interest_rate_month: number;
  start_date?: Date;
};

export type AnnuityInfo = {
  annuity_per_month: number;
  annuity_per_year: number;
  total_payoff: number;
  interest_cost: number;
};

export type AnnuityTable = {
  index: number;
  period: number;
  payoff_month: string;
  annuity: number;
  interest: number;
  capital: number;
  amount_open: number;
  amount_payed: number;
};

export type AnnuityResult = {
  input_parameters: InputParameters;
  annuity_info: AnnuityInfo;
  annuity_table: AnnuityTable;
};

export type AnnuityResultWithId = AnnuityResult & { id: string };
