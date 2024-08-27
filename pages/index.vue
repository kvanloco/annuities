<template>
  Index page
  <div>
    <div class="my-2">
      <label for="amount">Amount</label>
      <UInput v-model="amount" />
    </div>
    <div class="my-2">
      <label for="rate">Rate</label>
      <UInput v-model="rate" />
    </div>
    <div class="my-2">
      <label for="duration">Duration in years</label>
      <UInput v-model="duration" />
    </div>
    <div class="my-5">
      <UButton @click="calculate">Calculate</UButton>
    </div>
    <UDivider />
  </div>

  <h1 class="text-3xl font-bold underline">Input parameters</h1>
  <UTable :rows="inputParameterTable" />
  <h1 class="text-3xl font-bold underline">Annuity info</h1>
  <UTable :rows="annuityInfoTable" />
  <h1 class="text-3xl font-bold underline">Annuity table</h1>
  <UTable :rows="annuity.annuity_table" />
</template>

<script setup lang="ts">
const amount = ref(100000);
const rate = ref(0.04);
const duration = ref(10);

const calculate = () => {
  console.log(amount.value, rate.value, duration.value);
};

const { data: annuity, error } = await useFetch("/api/annuity", {
  method: "POST",
  body: {
    amount: 100000,
    rate: 0.04,
    duration: 10,
  },
});

const inputParameterTable = computed(() => {
  return [
    {
      parameter: "Loan amount",
      value: annuity.value.input_parameters.loan_amount,
    },
    {
      parameter: "Periods years",
      value: annuity.value.input_parameters.periods_years,
    },
    {
      parameter: "Periods months",
      value: annuity.value.input_parameters.periods_years,
    },
    {
      parameter: "Interest rate year",
      value: annuity.value.input_parameters.interest_rate_year,
    },
    {
      parameter: "Interest rate month",
      value: annuity.value.input_parameters.interest_rate_month,
    },
  ];
});

const annuityInfoTable = computed(() => {
  return [
    {
      parameter: "Annuity per month",
      value: annuity.value.annuity_info.annuity_per_month,
    },
    {
      parameter: "Annuity per year",
      value: annuity.value.annuity_info.annuity_per_year,
    },
    {
      parameter: "Interest cost",
      value: annuity.value.annuity_info.interest_cost,
    },
    {
      parameter: "Total payoff",
      value: annuity.value.annuity_info.total_payoff,
    },
  ];
});

if (error.value) {
  console.error(error.value);
}

console.log(annuity.value);
</script>

brendaa_h@yahoo.com
