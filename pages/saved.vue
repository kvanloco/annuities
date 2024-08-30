<template>
  <div>
    <h1 class="text-xl font-bold">Saved annuities</h1>
    <ClientOnly>
      <UTable :rows="annuityTable" :columns="columns" :ui="{}">
        <template #loan_amount-data="{ row }">
          <span>{{ toEuro.format(row.loan_amount) }}</span>
        </template>
        <template #interest_rate_year-data="{ row }">
          <span>{{ toPercent.format(row.interest_rate_year / 100) }}</span>
        </template>
        <template #interest_rate_month-data="{ row }">
          <span>{{ toPercent.format(row.interest_rate_month / 100) }}</span>
        </template>
        <template #start_date-data="{ row }">
          <span>
            {{
              row.start_date
                ? toDate.format(new Date(row.start_date))
                : row.start_date
            }}
            <br />
          </span>
        </template>
        <template #actions-data="{ row }">
          <UDropdown :items="items(row)">
            <UButton
              color="gray"
              variant="ghost"
              icon="i-heroicons-ellipsis-horizontal-20-solid"
            />
          </UDropdown>
        </template>
      </UTable>
    </ClientOnly>
  </div>
</template>

<script setup lang="ts">
import type {
  AnnuityResult,
  AnnuityResultWithId,
  InputParameters,
} from "@/types/types";
import { useAnnuityStorage } from "@/composables/annuityStorage";
import { useAnnuityStore } from "~/store/annuityStore";
const annuityStore = useAnnuityStore();

const { getAnnuityItems, deleteAnnuityItem } = useAnnuityStorage();
const toast = useToast();

const annuityItems = ref<AnnuityResultWithId[]>();

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

const columns = [
  {
    key: "loan_amount",
    label: "Loan amount",
  },
  {
    key: "periods_years",
    label: "Period in years",
  },
  {
    key: "periods_months",
    label: "Period in months",
  },
  {
    key: "interest_rate_year",
    label: "Yearly interest",
  },
  {
    key: "interest_rate_month",
    label: "Monthly interest",
  },
  {
    key: "start_date",
    label: "Start date",
  },
  {
    key: "actions",
  },
];

const items = (row: InputParameters) => [
  [
    {
      label: "View",
      icon: "i-heroicons-pencil-square-20-solid",
      click: () => {
        // Navigate to Index and set store values
        navigateTo({ path: "/" });
        annuityStore.amount = Number(row.loan_amount);
        annuityStore.rate = Number(row.interest_rate_year);
        annuityStore.duration = Number(row.periods_years);
        annuityStore.start_date = new Date(row.start_date)
          .toISOString()
          .slice(0, 10);
        annuityStore.calculate();
      },
    },
  ],

  [
    {
      label: "Delete",
      icon: "i-heroicons-trash-20-solid",
      class: "text-red-500",
      click: () => {
        deleteAnnuityItem(row.id);
        annuityItems.value = getAnnuityItems();
        toast.add({
          title: "Annuity deleted",
          description: "Annuity deleted successfully",
        });
      },
    },
  ],
];
const annuityTable = computed(() => {
  return annuityItems.value?.map((annuityItem: AnnuityResultWithId) => {
    return {
      ...annuityItem.input_parameters,
      id: annuityItem.id,
    };
  });
});

onMounted(() => {
  annuityItems.value = getAnnuityItems();
});
</script>

<style scoped></style>
