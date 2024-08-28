<script lang="ts" setup>
useHead({
  title: "Annuity Calculator",
  meta: [{ name: "description", content: "Annuity Calculator!" }],
  bodyAttrs: {
    class: "test",
  },
  script: [{ innerHTML: "console.log('Hello world')" }],
});
</script>

<template>
  <UContainer>
    <div
      class="flex justify-between p-2 bg-grey-100"
      id="element-to-print"
      ref="printElement"
    >
      <h1>Annuity Calculator</h1>
      <ColorScheme
        ><USelect
          v-model="$colorMode.preference"
          :options="['system', 'light', 'dark']"
      /></ColorScheme>
    </div>

    <NuxtPage />
  </UContainer>
</template>
