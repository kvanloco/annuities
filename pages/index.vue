<template>
  <div ref="document" id="element-to-convert">
    <div class="flex gap-2">
      <div class="w-1/2">
        <div class="my-2">
          <label for="amount">Loan Amount</label>
          <UInput type="number" v-model="amount">
            <template #trailing>
              <span class="text-gray-500 dark:text-gray-400 text-xs">EUR</span>
            </template>
          </UInput>
        </div>
        <div class="my-2">
          <label for="rate">Rate in % per year</label>
          <UInput type="number" v-model="rate">
            <template #trailing>
              <span class="text-gray-500 dark:text-gray-400 text-xs">%</span>
            </template>
          </UInput>
        </div>
      </div>
      <div class="w-1/2">
        <div class="my-2">
          <label for="duration">Duration in years</label>
          <UInput type="number" v-model="duration">
            <template #trailing>
              <span class="text-gray-500 dark:text-gray-400 text-xs"
                >YEARS</span
              >
            </template></UInput
          >
        </div>
        <div class="my-2">
          <label for="duration">Start date</label>
          <UInput type="date" v-model="start_date">
            <template #trailing>
              <span class="text-gray-500 dark:text-gray-400 text-xs">DATE</span>
            </template>
          </UInput>
        </div>
      </div>
    </div>
    <div class="flex gap-2">
      <div class="my-2">
        <UButton @click="calculate">Calculate</UButton>
      </div>

      <div class="my-2" v-if="annuityResult">
        <UButton @click="saveAnnuity">Save</UButton>
      </div>
    </div>
    <UDivider />
    <div v-if="annuityResult" class="mt-2">
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
        :rows="annuityTable"
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
const toast = useToast();
import { useStorage } from "@vueuse/core";
import { v4 as uuidv4 } from "uuid";

const annuityItems = computed(() => {
  const items = [];
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key.startsWith("annuity")) {
      const item = localStorage.getItem(key);

      console.log("item", JSON.parse(item));
      items.push(item);
    }
  }
  console.log("annuityItems", items);
  return items;
});

const saveAnnuity = () => {
  // save to storage
  const uniqueKey = uuidv4();
  const prefix = "annuity-";
  const key = prefix + uniqueKey;
  //state.value = { ...state.value, count: state.value.count + 1 };
  //console.log("state", state.value);
  localStorage.setItem(key, JSON.stringify(annuityResult.value));
  toast.add({
    title: "Annuity saved",
    description: "Annuity saved successfully",
  });
};
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

const amount = ref(100000);
const rate = ref(4);
const duration = ref(10);

const start_date = ref(new Date().toISOString().slice(0, 10));
const annuityResult = ref(undefined);

const calculate = async () => {
  const annuityResults = await $fetch("/api/annuity", {
    method: "POST",
    body: {
      amount: amount.value,
      rate: rate.value,
      duration: duration.value,
      start_date: start_date.value,
    },
  });
  //console.log("annuityResult", annuityResults);
  //annuityResult.value = annuityResult;
  toast.add({
    title: "The annuity has been calculated",
  });
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
      value: toPercent.format(
        annuityResult.value.input_parameters.interest_rate_year / 100
      ),
    },
    {
      parameter: "Interest rate month",
      value: toPercent.format(
        annuityResult.value.input_parameters.interest_rate_month / 100
      ),
    },
  ];
});

const annuityInfoTable = computed(() => {
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
