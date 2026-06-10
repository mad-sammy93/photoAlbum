<script setup>
definePageMeta({
  layout: "admin",
  middleware: "auth",
});

const supabase = useSupabaseClient();

const { data: albums, error } = await useAsyncData("albums", async () => {
  const { data, error } = await supabase
    .from("albums")
    .select("*")
    .order("sort_order");

  if (error) throw error;

  return data;
});
</script>

<template>
  <div>
    <div class="flex justify-between mb-8">
      <h1 class="text-4xl font-serif">Albums</h1>

      <NuxtLink
        to="/admin/albums/new"
        class="bg-amber-500 px-4 py-2 rounded-xl text-black"
      >
        New Album
      </NuxtLink>
    </div>
    <div class="space-y-4">
      <div
        v-for="album in albums || []"
        :key="album.id"
        class="bg-zinc-900 p-6 rounded-2xl"
      >
        <h2>{{ album.title }}</h2>

        <p class="text-zinc-400">
          {{ album.description }}
        </p>
      </div>
    </div>
  </div>
</template>
