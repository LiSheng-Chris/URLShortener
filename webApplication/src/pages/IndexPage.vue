<template>
  <q-page class="flex flex-center">
    <q-table
      flat
      bordered
      style="width: 800px; max-width: 90%"
      :rows="rows"
      :columns="columns"
      :loading="isLoading"
      row-key="name"
    >
      <template v-slot:top>
        <q-input
          outlined
          debounce="300"
          class="full-width"
          v-model="url"
          :rules="[isUrlValid]"
          placeholder="Enter new URL"
        >
          <template v-slot:append>
            <q-btn
              dense
              flat
              color="primary"
              icon="add"
              :disable="isLoading"
              @click="createNewUrl"
            />
          </template>
        </q-input>
      </template>
      <template v-slot:body="props">
        <q-tr :props="props">
          <q-td v-for="col in props.cols" :key="col.name" :props="props">
            <q-btn
              flat
              v-if="col.name == 'Action'"
              color="red"
              icon="delete"
              :disable="isLoading"
              @click="deleteUrl(props.row.short)"
            />
            <div v-else>
              {{ col.value }}
            </div>
          </q-td>
        </q-tr>
      </template>
    </q-table>
  </q-page>
</template>

<script setup>
import axios from "axios";
import { onMounted, ref } from "vue";

const isLoading = ref(true);
const host = window.location.host;
const rows = ref();
const columns = [
  {
    name: "Shortened URL",
    required: true,
    label: "Shortened URL",
    align: "left",
    field: (row) => row.short,
    format: (val) => (val ? `${host}/${val}` : "-"),
    sortable: true,
  },
  {
    name: "Original URL",
    required: true,
    label: "Original URL",
    align: "left",
    field: (row) => row.long,
    format: (val) => (val ? `${val}` : "-"),
    sortable: true,
  },
  {
    name: "Action",
  },
];

const url = ref("");
const createNewUrl = async () => {
  if (isUrlValid(url.value) == "Invalid URL") {
    return;
  }
  isLoading.value = true;
  await axios.post("https://urlshortener-g6akfmzkcq-uc.a.run.app/create", {
    long: url.value.trim(),
  });
  await getUrls();
  isLoading.value = false;
};

const deleteUrl = async (short) => {
  isLoading.value = true;
  await axios.post("https://urlshortener-g6akfmzkcq-uc.a.run.app/delete", {
    short,
  });
  await getUrls();
  isLoading.value = false;
};

function isUrlValid(userInput) {
  const urlRegex =
    /^(https?|ftp):\/\/(([a-z\d]([a-z\d-]*[a-z\d])?\.)+[a-z]{2,}|localhost)(\/[-a-z\d%_.~+]*)*(\?[;&a-z\d%_.~+=-]*)?(\#[-a-z\d_]*)?$/i;
  return urlRegex.test(userInput) || "Invalid URL";
}

const getUrls = async () => {
  const { data } = await axios.get(
    "https://urlshortener-g6akfmzkcq-uc.a.run.app"
  );
  rows.value = data;
};

onMounted(async () => {
  await getUrls();
  isLoading.value = false;
});
</script>
