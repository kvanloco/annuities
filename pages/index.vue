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
    kieke
    <div class="my-5">
      <UButton @click="calculate">Calculate</UButton>
    </div>
    <UDivider />
  </div>
  <div v-if="annuityResult">
    <h1 class="text-3xl font-bold underline">Input parameters</h1>
    <UTable :rows="inputParameterTable" />
    <h1 class="text-3xl font-bold underline">Annuity info</h1>
    <UTable :rows="annuityInfoTable" />
    <h1 class="text-3xl font-bold underline">Annuity table</h1>
    <UTable :rows="annuityTable" />
  </div>
</template>

<script setup lang="ts">
// HELPER FUNCTIONS
let toEuro = new Intl.NumberFormat("be-BE", {
  style: "currency",
  currency: "EUR",
});

const amount = ref(100000);
const rate = ref(0.04);
const duration = ref(10);
const annuityResult = ref(undefined);

const calculate = async () => {
  const annuityResults = await $fetch("/api/annuity", {
    method: "POST",
    body: {
      amount: amount.value,
      rate: rate.value,
      duration: duration.value,
    },
  });
  console.log("annuityResult", annuityResults);
  //annuityResult.value = annuityResult;
  return (annuityResult.value = annuityResults);
};

watch(
  () => annuityResult,
  () => {
    console.log("watcheffect");
    !annuityResult.value ? [] : annuityResult.value.annuity_table;
  }
);

const annuityTable = computed(() => {
  if (!annuityResult.value) return [];
  return annuityResult.value.annuity_table;
});

const inputParameterTable = computed(() => {
  console.log("ann", annuityResult.value);
  if (!annuityResult.value) return [];
  return [
    {
      parameter: "Loan amount",
      value: toEuro.format(annuityResult.value.input_parameters.loan_amount),
    },
    {
      parameter: "Periods years",
      value: annuityResult.value.input_parameters.periods_years,
    },
    {
      parameter: "Periods months",
      value: annuityResult.value.input_parameters.periods_months,
    },
    {
      parameter: "Interest rate year",
      value: annuityResult.value.input_parameters.interest_rate_year,
    },
    {
      parameter: "Interest rate month",
      value: annuityResult.value.input_parameters.interest_rate_month,
    },
  ];
});

const annuityInfoTable = computed(() => {
  console.log("ann2", annuityResult.value);
  if (!annuityResult.value) return [];
  return [
    {
      parameter: "Annuity per month",
      value: toEuro.format(annuityResult.value.annuity_info.annuity_per_month),
    },
    {
      parameter: "Annuity per year",
      value: toEuro.format(annuityResult.value.annuity_info.annuity_per_year),
    },
    {
      parameter: "Interest cost",
      value: toEuro.format(annuityResult.value.annuity_info.interest_cost),
    },
    {
      parameter: "Total payoff",
      value: toEuro.format(annuityResult.value.annuity_info.total_payoff),
    },
  ];
});
</script>
