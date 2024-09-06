<template>
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
            <span class="text-gray-500 dark:text-gray-400 text-xs">YEARS</span>
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
  <div class="flex gap-2 justify-between">
    <div class="my-2">
      <UButton @click="onCalculate">Calculate</UButton>
    </div>

    <div class="my-2 flex gap-2" v-if="annuityStore.annuityResult">
      <UInput v-model="name" placeholder="Give it a name"></UInput>
      <UButton @click="onSave">Save</UButton>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { AnnuityResult, InputProps } from "@/types/types";
import { useAnnuityStore } from "~/store/annuityStore";
const annuityStore = useAnnuityStore();
const toast = useToast();
import { useAnnuityStorage } from "@/composables/annuityStorage";
const { saveAnnuityItem } = useAnnuityStorage();

const amount = ref<number>(100000);
const rate = ref<number>(4);
const duration = ref<number>(10);
const start_date = ref<string>(new Date().toISOString().slice(0, 10));
const name = ref<string>("");

const emit = defineEmits<{
  calculate: [InputProps];
}>();

const saveAnnuity = () => {
  if (!annuityStore.annuityResult) return;
  saveAnnuityItem(annuityStore.annuityResult);
  toast.add({
    title: "Annuity saved",
    description: "Annuity saved successfully",
  });
};

const onCalculate = () => {
  console.log("onCalculate");
  emit("calculate", {
    amount: amount.value,
    rate: rate.value,
    duration: duration.value,
    start_date: start_date.value,
  });
};

const onSave = () => {
  console.log("onSave");
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
