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
    {{ toDate.format(new Date()) }}
  </div>
</template>

<script setup lang="ts">
import type { AnnuityResult, AnnuityResultWithId } from "@/types/types";
import { useAnnuityStorage } from "@/composables/annuityStorage";

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

const items = (row: AnnuityResultWithId) => [
  [
    {
      label: "View",
      icon: "i-heroicons-pencil-square-20-solid",
      click: () => console.log("Edit", row.id),
    },
    {
      label: "Edit",
      icon: "i-heroicons-pencil-square-20-solid",
      click: () => console.log("Edit", row.id),
    },
    {
      label: "Duplicate",
      icon: "i-heroicons-document-duplicate-20-solid",
      disabled: true,
    },
  ],
  [
    {
      label: "Archive",
      icon: "i-heroicons-archive-box-20-solid",
      disabled: true,
    },
    {
      label: "Move",
      icon: "i-heroicons-arrow-right-circle-20-solid",
      disabled: true,
    },
  ],
  [
    {
      label: "Delete",
      icon: "i-heroicons-trash-20-solid",
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
const getAnnuityItemsOld = () => {
  const items = [];
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key.startsWith("annuity")) {
      const item = localStorage.getItem(key);
      const item2 = JSON.parse(item);
      items.push({ ...item2, id: key });
    }
  }
  console.log(items);
  return items;
};

const deleteAnnuityItemold = (id: string) => {
  localStorage.removeItem(id);
};
</script>

<style scoped></style>
