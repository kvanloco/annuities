<template>
  <div ref="document" id="element-to-convert">
    <AnnuityInput @calculate="onCalculate" />
    <UDivider />
    <!-- <AnnuityTable2 :annuity-result="annuityStore.annuityResult" /> -->
    <UDivider />

    <!-- <AnnuityTable /> -->
  </div>
</template>

<script setup lang="ts">
import { useAnnuityStore } from "~/store/annuityStore";
import type { InputProps } from "~/types/types";
const annuityStore = useAnnuityStore();

const onCalculate = (inputProps: InputProps) => {
  console.log("onCalculate from index.vue");
  console.log(inputProps);
  
};
</script>
