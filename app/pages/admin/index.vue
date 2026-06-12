<script setup lang="ts">
definePageMeta({
  layout: "admin",
  middleware: "auth",
});

const supabase = useSupabaseClient();

const loading = ref(true);

const stats = reactive({
  albums: 0,
  photos: 0,
});

async function loadDashboard() {
  try {
    loading.value = true;

    const [albumsResponse, photosResponse] = await Promise.all([
      supabase.from("albums").select("*", {
        count: "exact",
        head: true,
      }),

      supabase.from("photos").select("*", {
        count: "exact",
        head: true,
      }),
    ]);

    stats.albums = albumsResponse.count || 0;

    stats.photos = photosResponse.count || 0;
  } catch (error) {
    console.error(error);
  } finally {
    loading.value = false;
  }
}

onMounted(() => {
  loadDashboard();
});
</script>

<template>
  <div class="space-y-10">
    <!-- Header -->
    <div>
      <h1 class="text-4xl font-serif text-white">Photo Dashboard</h1>

      <p class="mt-3 text-zinc-400">Manage your albums and photographs.</p>
    </div>

    <!-- Stats -->
    <div class="grid gap-6 md:grid-cols-2">
      <div class="rounded-3xl border border-zinc-800 bg-zinc-900 p-8">
        <p class="text-sm uppercase tracking-[0.25em] text-zinc-500">Albums</p>

        <h2 class="mt-4 text-5xl font-serif">
          {{ loading ? "..." : stats.albums }}
        </h2>
      </div>

      <div class="rounded-3xl border border-zinc-800 bg-zinc-900 p-8">
        <p class="text-sm uppercase tracking-[0.25em] text-zinc-500">Photos</p>

        <h2 class="mt-4 text-5xl font-serif">
          {{ loading ? "..." : stats.photos }}
        </h2>
      </div>
    </div>

    <!-- Quick Actions -->
    <div class="rounded-3xl border border-zinc-800 bg-zinc-900 p-8">
      <h2 class="text-2xl font-serif">Quick Actions</h2>

      <div class="mt-8 flex flex-wrap gap-4">
        <NuxtLink
          to="/admin/albums"
          class="rounded-xl bg-zinc-800 px-6 py-3 transition hover:bg-zinc-700"
        >
          Manage Albums
        </NuxtLink>

        <NuxtLink
          to="/admin/photos"
          class="rounded-xl bg-amber-500 px-6 py-3 font-medium text-black transition hover:bg-amber-400"
        >
          Upload Photos
        </NuxtLink>
      </div>
    </div>
  </div>
</template>
