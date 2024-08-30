<template>
  <div class="flex gap-2">
    <div class="w-1/2">
      <div class="my-2">
        <label for="amount">Loan Amount</label>
        <UInput type="number" v-model="annuityStore.amount">
          <template #trailing>
            <span class="text-gray-500 dark:text-gray-400 text-xs">EUR</span>
          </template>
        </UInput>
      </div>
      <div class="my-2">
        <label for="rate">Rate in % per year</label>
        <UInput type="number" v-model="annuityStore.rate">
          <template #trailing>
            <span class="text-gray-500 dark:text-gray-400 text-xs">%</span>
          </template>
        </UInput>
      </div>
    </div>
    <div class="w-1/2">
      <div class="my-2">
        <label for="duration">Duration in years</label>
        <UInput type="number" v-model="annuityStore.duration">
          <template #trailing>
            <span class="text-gray-500 dark:text-gray-400 text-xs">YEARS</span>
          </template></UInput
        >
      </div>
      <div class="my-2">
        <label for="duration">Start date</label>
        <UInput type="date" v-model="annuityStore.start_date">
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

    <div class="my-2" v-if="annuityStore.annuityResult">
      <UButton @click="saveAnnuity">Save</UButton>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { AnnuityResult } from "@/types/types";
import { useAnnuityStore } from "~/store/annuityStore";
const annuityStore = useAnnuityStore();
const toast = useToast();
import { useAnnuityStorage } from "@/composables/annuityStorage";
const { saveAnnuityItem } = useAnnuityStorage();

// if lastest_input is in local storage, use it
onMounted(() => {
  /*
  const lastest_input = localStorage.getItem("lastest_input");
  if (lastest_input) {
    const lastest_input_json = JSON.parse(lastest_input);
    annuityStore.amount = lastest_input_json.amount;
    annuityStore.rate = lastest_input_json.rate;
    annuityStore.duration = lastest_input_json.duration;
    annuityStore.start_date = lastest_input_json.start_date;
  }
    */
});
const saveAnnuity = () => {
  if (!annuityStore.annuityResult) return;
  saveAnnuityItem(annuityStore.annuityResult);
  toast.add({
    title: "Annuity saved",
    description: "Annuity saved successfully",
  });
};

const calculate = async () => {
  annuityStore.calculate();
  toast.add({
    title: "The annuity has been calculated",
  });
  // Save last input parameters to local storage
  localStorage.setItem(
    "lastest_input",
    JSON.stringify({
      amount: annuityStore.amount,
      rate: annuityStore.rate,
      duration: annuityStore.duration,
      start_date: annuityStore.start_date,
    })
  );
};
</script>

<style scoped></style>
