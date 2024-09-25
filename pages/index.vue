<template>
  <div ref="document" id="element-to-convert">
    <AnnuityInput @calculate="onCalculate" />
    <UDivider />
    <!-- <AnnuityTable2 v-if="showResult" :annuity-result="annuityResult" /> -->
    <UDivider />
    <pre v-if="annuityResult">{{ annuityResult }}</pre>
    <!-- <AnnuityTable /> -->
  </div>
</template>

<script setup lang="ts">
import { useAnnuityStore } from "~/store/annuityStore";
import type { InputProps, AnnuityResult } from "~/types/types";
const annuityStore = useAnnuityStore();
const annuityResult = ref<AnnuityResult | undefined>();
const showResult = ref(false);

const onCalculate = async (inputProps: InputProps) => {
  console.log("onCalculate from index.vue");
  console.log(inputProps);
  annuityResult.value = await annuityStore.calculate(inputProps);
  showResult.value = true;
};
</script>
