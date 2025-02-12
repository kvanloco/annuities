<script lang="ts" setup>
useHead({
  title: "Annuity Calculator",
  meta: [
    {
      name: "description",
      content:
        "Easily Calculate Your Mortgage Payments! Hey there! Welcome to https://annuities.vercel.app/ —your go-to spot for quick and easy mortgage calculations. Whether you're eyeing a new house or car, we've got you covered. Just plug in your loan amount, duration, and interest rate, and we'll do the rest.u'll get all the important details, like: Your monthly payment, Interest costs,Total payoff amount. And guess what? You can save your results for later, making it super simple to keep track of everything. Give it a try and take the stress out of mortgage planning!",
    },
  ],
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
          <NuxtLink to="/app">Calculate</NuxtLink>
        </div>
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
