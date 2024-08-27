<template>
  Index page
  <h1 class="text-3xl font-bold underline">Input parameters</h1>
  <UTable :rows="inputTable" />
  <h1 class="text-3xl font-bold underline">Annuity info</h1>
  <UTable :rows="annuity.annuity_info" />
  <h1 class="text-3xl font-bold underline">Annuity table</h1>
  <UTable :rows="annuity.annuity_table" />
</template>

<script setup lang="ts">
const { data: annuity, error } = await useFetch("/api/annuity", {
  method: "POST",
  body: {
    amount: 100000,
    rate: 0.04,
    duration: 10,
  },
});

const inputTableMapper = [
  {
    key: "loan_amount",
    value: "Loan amount",
  },
  {
    key: "periods_years",
    value: "Periods years",
  },
  {
    key: "periods_months",
    value: "Periods months",
  },
  {
    key: "interest_rate_year",
    value: "Interest rate year",
  },
  {
    key: "interest_rate_month",
    value: "Interest rate month",
  },
];

const inputTable = computed(() =>
  Object.entries(annuity.value.input_parameters)
);
console.log(inputTable.value);

if (error.value) {
  console.error(error.value);
}

console.log(annuity.value);
</script>
