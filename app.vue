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
      <div class="flex gap-2 items-center">
        <h1 class="text-xl pe-5">Annuity Calculator</h1>
        <div class="text-gray-500"><NuxtLink to="/">Home</NuxtLink></div>
        <div class="text-gray-500">
          <NuxtLink to="/saved"> Saved annuities</NuxtLink>
        </div>
      </div>
      <ColorScheme
        ><USelect
          v-model="$colorMode.preference"
          :options="['system', 'light', 'dark']"
      /></ColorScheme>
    </div>

    <NuxtPage />
  </UContainer>
  <UNotifications />
</template>
