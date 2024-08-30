<template>
  <div ref="document" id="element-to-convert">
    <AnnuityInput />
    <UDivider />
    <AnnuityTable />
  </div>
</template>

<script setup lang="ts">
import { useAnnuityStore } from "~/store/annuityStore";
const annuityStore = useAnnuityStore();
</script>
