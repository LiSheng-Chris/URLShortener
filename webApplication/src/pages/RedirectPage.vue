<template></template>

<script setup>
import axios from "axios";
import { useRoute } from "vue-router";
import { onMounted } from "vue";

const route = useRoute();
const url = route.params.url ?? "";

onMounted(async () => {
  const { data } = await axios.get(
    `https://urlshortener-g6akfmzkcq-uc.a.run.app/${url}`
  );

  if (data) {
    window.location.href = data;
  }
});
</script>
