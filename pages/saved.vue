<template>
  <div>
    <h1 class="text-xl font-bold">Saved annuities</h1>
    <UTable :rows="annuityTable" :columns="columns" :ui="{}">
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
    <div v-for="annuityItem in annuityItems">
      {{ annuityItem.input_parameters }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { useStorage } from "@vueuse/core";

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
      label: "Edit",
      icon: "i-heroicons-pencil-square-20-solid",
      click: () => console.log("Edit", row.id),
    },
    {
      label: "Duplicate",
      icon: "i-heroicons-document-duplicate-20-solid",
    },
  ],
  [
    {
      label: "Archive",
      icon: "i-heroicons-archive-box-20-solid",
    },
    {
      label: "Move",
      icon: "i-heroicons-arrow-right-circle-20-solid",
    },
  ],
  [
    {
      label: "Delete",
      icon: "i-heroicons-trash-20-solid",
    },
  ],
];
const annuityTable = computed(() => {
  return annuityItems.value.map((annuityItem) => {
    return annuityItem.input_parameters;
  });
});

const annuityItems = computed(() => {
  const items = [];
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key.startsWith("annuity")) {
      const item = localStorage.getItem(key);
      const item2 = JSON.parse(item);
      items.push(item2);
    }
  }
  return items;
});
</script>

<style scoped></style>
