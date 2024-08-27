<template>Index page</template>

<script setup lang="ts">
const { data: annuity, error } = await useFetch("/api/annuity", {
  method: "POST",
  body: {
    amount: 100000,
    rate: 0.04,
    duration: 10,
  },
});

if (error.value) {
  console.error(error.value);
}

console.log(annuity.value);
</script>
