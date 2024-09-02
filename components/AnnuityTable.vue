<template>
  <div>
    <div v-if="annuityStore.annuityResult" class="mt-2">
      <h1 class="text-xl font-bold">Input parameters</h1>
      <UTable
        :rows="inputParameterTable"
        :ui="{
          td: {
            padding: ' py-1',
          },
        }"
      >
      </UTable>
      <h1 class="text-xl font-bold">Annuity info</h1>
      <UTable
        :rows="annuityInfoTable"
        :ui="{
          td: {
            padding: ' py-1',
          },
        }"
      ></UTable>
      <h1 class="text-xl font-bold">Annuity table</h1>
      <UTable
        :rows="annuityTable!"
        :ui="{
          td: {
            padding: ' py-1',
          },
        }"
      >
        <template #annuity-data="{ row }">
          <span>{{ toEuro.format(row.annuity) }}</span>
        </template>
        <template #interest-data="{ row }">
          <span>{{ toEuro.format(row.interest) }}</span>
        </template>
        <template #capital-data="{ row }">
          <span>{{ toEuro.format(row.capital) }}</span>
        </template>
        <template #rest-data="{ row }">
          <span>{{ toEuro.format(row.rest) }}</span>
        </template>
        <template #total_payed-data="{ row }">
          <span>{{ toEuro.format(row.total_payed) }}</span>
        </template>
        <template #time-data="{ row }">
          <span>{{ toDate.format(new Date(row.time)) }}</span>
        </template>
      </UTable>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useAnnuityStore } from "~/store/annuityStore";
const annuityStore = useAnnuityStore();

// HELPER FUNCTIONS
let toEuro = new Intl.NumberFormat("be-BE", {
  style: "currency",
  currency: "EUR",
});

let toPercent = new Intl.NumberFormat("be-BE", {
  style: "percent",
  maximumSignificantDigits: 3,
});

let toDate = new Intl.DateTimeFormat("be-BE", {
  dateStyle: "short",
});

const annuityTable = computed(() => {
  return annuityStore?.annuityResult?.annuity_table;
});

const inputParameterTable = computed(() => {
  if (!annuityStore.annuityResult) return [];
  return [
    {
      parameter: "Loan amount",
      value: toEuro.format(
        annuityStore.annuityResult.input_parameters.loan_amount
      ),
    },
    {
      parameter: "Periods years",
      value: annuityStore.annuityResult.input_parameters.periods_years,
    },
    {
      parameter: "Periods months",
      value: annuityStore.annuityResult.input_parameters.periods_months,
    },
    {
      parameter: "Interest rate year",
      value: toPercent.format(
        annuityStore.annuityResult.input_parameters.interest_rate_year / 100
      ),
    },
    {
      parameter: "Interest rate month",
      value: toPercent.format(
        annuityStore.annuityResult.input_parameters.interest_rate_month / 100
      ),
    },
    {
      parameter: "Start date",
      value: toDate.format(
        annuityStore.annuityResult.input_parameters.start_date
          ? new Date(annuityStore.annuityResult.input_parameters.start_date)
          : new Date()
      ),
    },
  ];
});

const annuityInfoTable = computed(() => {
  if (!annuityStore.annuityResult) return [];
  return [
    {
      parameter: "Annuity per month",
      value: toEuro.format(
        annuityStore.annuityResult.annuity_info.annuity_per_month
      ),
    },
    {
      parameter: "Annuity per year",
      value: toEuro.format(
        annuityStore.annuityResult.annuity_info.annuity_per_year
      ),
    },
    {
      parameter: "Interest cost",
      value: toEuro.format(
        annuityStore.annuityResult.annuity_info.interest_cost
      ),
    },
    {
      parameter: "Total payoff",
      value: toEuro.format(
        annuityStore.annuityResult.annuity_info.total_payoff
      ),
    },
  ];
});
</script>

<style scoped></style>
