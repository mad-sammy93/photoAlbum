<script setup lang="ts">
definePageMeta({
  layout: "admin",
  middleware: "auth",
});

const supabase = useSupabaseClient();

const loading = ref(true);
const errorMessage = ref("");
const albums = ref<
  {
    id: string;
    title: string;
  }[]
>([]);

async function fetchAlbums() {
  try {
    loading.value = true;

    const { data, error } = await supabase
      .from("albums")
      .select("id, title")
      .eq("is_published", true)
      .order("sort_order");

    if (error) {
      throw error;
    }

    albums.value = data || [];
  } catch (error: any) {
    console.error(error);

    errorMessage.value = error.message || "Failed to load albums";
  } finally {
    loading.value = false;
  }
}

onMounted(() => {
  fetchAlbums();
});
</script>

<template>
  <div class="space-y-8">
    <!-- Header -->
    <div>
      <h1 class="text-4xl font-serif text-white">Photo Uploads</h1>

      <p class="mt-2 text-zinc-400">Upload wedding photographs to an album.</p>
    </div>

    <!-- Loading -->
    <div
      v-if="loading"
      class="rounded-3xl border border-zinc-800 bg-zinc-900 p-8"
    >
      <p class="text-zinc-400">Loading albums...</p>
    </div>

    <!-- Error -->
    <div
      v-else-if="errorMessage"
      class="rounded-3xl border border-red-900 bg-red-950 p-8"
    >
      <p class="text-red-300">
        {{ errorMessage }}
      </p>
    </div>

    <!-- No albums -->
    <div
      v-else-if="albums.length === 0"
      class="rounded-3xl border border-zinc-800 bg-zinc-900 p-8"
    >
      <h2 class="text-xl font-semibold">No Albums Found</h2>

      <p class="mt-2 text-zinc-400">Create an album before uploading photos.</p>

      <NuxtLink
        to="/admin/albums"
        class="mt-6 inline-flex rounded-xl bg-amber-500 px-5 py-3 font-medium text-black"
      >
        Manage Albums
      </NuxtLink>
    </div>

    <!-- Uploader -->
    <AdminPhotoUploader v-else :albums="albums" />
  </div>
</template>
