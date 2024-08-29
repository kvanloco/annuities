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
import { useStorage } from "@vueuse/core";

const annuityItems = ref(null);

// HELPER FUNCTIONS
let toEuro = new Intl.NumberFormat("be-BE", {
  style: "currency",
  currency: "EUR",
});

let toPercent = new Intl.NumberFormat("be-BE", {
  style: "percent",
  maximumSignificantDigits: 3,
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
    key: "actions",
  },
];

const items = (row) => [
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
        //window.location.reload();
        annuityItems.value = getAnnuityItems();
      },
    },
  ],
];
const annuityTable = computed(() => {
  return annuityItems.value.map((annuityItem) => {
    return {
      ...annuityItem.input_parameters,
      id: annuityItem.id,
    };
  });
});

onMounted(() => {
  annuityItems.value = getAnnuityItems();
});
const getAnnuityItems = () => {
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

const deleteAnnuityItem = (id: string) => {
  localStorage.removeItem(id);
};
</script>

<style scoped></style>
