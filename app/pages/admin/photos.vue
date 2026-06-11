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

const selectedAlbum = ref("");

const photos = ref<any[]>([]);

const deleting = ref(false);

const deleteModalOpen = ref(false);

const photoToDelete = ref<any>(null);

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

    if (albums.value && albums.value.length) {
      if (albums.value[0]) {
        selectedAlbum.value = albums.value[0].id;
        await fetchPhotos();
      }
    }
  } catch (error: any) {
    console.error(error);

    errorMessage.value = error.message || "Failed to load albums";
  } finally {
    loading.value = false;
  }
}

async function fetchPhotos() {
  if (!selectedAlbum.value) {
    photos.value = [];

    return;
  }

  const { data, error } = await supabase
    .from("photos")
    .select("*")
    .eq("album_id", selectedAlbum.value)
    .order("sort_order");

  if (error) {
    console.error(error);

    return;
  }

  photos.value = (data || []).map((photo) => ({
    ...photo,

    thumbnail_url: supabase.storage
      .from("thumbnails")
      .getPublicUrl(photo.thumbnail_path).data.publicUrl,
  }));
}

function askDelete(photo: any) {
  photoToDelete.value = photo;

  deleteModalOpen.value = true;
}

async function deletePhoto() {
  if (!photoToDelete.value) {
    return;
  }

  deleting.value = true;

  try {
    await supabase.storage
      .from("thumbnails")
      .remove([photoToDelete.value.thumbnail_path]);

    await supabase.storage
      .from("originals")
      .remove([photoToDelete.value.original_path]);

    const { error } = await supabase
      .from("photos")
      .delete()
      .eq("id", photoToDelete.value.id);

    if (error) {
      throw error;
    }

    photos.value = photos.value.filter(
      (photo) => photo.id !== photoToDelete.value.id,
    );

    deleteModalOpen.value = false;

    photoToDelete.value = null;
  } catch (error: any) {
    alert(error.message);
  } finally {
    deleting.value = false;
  }
}

onMounted(fetchAlbums);

watch(selectedAlbum, fetchPhotos);
</script>

<template>
  <div class="space-y-10">
    <div>
      <h1 class="text-5xl font-serif text-white">Photo Studio</h1>

      <p class="mt-3 text-zinc-400">Upload and manage wedding memories.</p>
    </div>

    <div
      v-if="loading"
      class="rounded-3xl border border-zinc-800 bg-zinc-900 p-8"
    >
      Loading...
    </div>

    <div
      v-else-if="errorMessage"
      class="rounded-3xl border border-red-900 bg-red-950 p-8"
    >
      {{ errorMessage }}
    </div>

    <template v-else>
      <AdminPhotoUploader :albums="albums" @uploaded="fetchPhotos" />
      <div class="rounded-3xl border border-zinc-800 bg-zinc-900 p-8">
        <label class="mb-3 block text-sm text-zinc-400"> Select Album </label>

        <select
          v-model="selectedAlbum"
          class="w-full rounded-2xl border border-zinc-800 bg-black p-4"
        >
          <option v-for="album in albums" :key="album.id" :value="album.id">
            {{ album.title }}
          </option>
        </select>
      </div>

      <div>
        <h2 class="mb-6 text-2xl font-serif">Album Photos</h2>

        <div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <div
            v-for="photo in photos"
            :key="photo.id"
            class="overflow-hidden rounded-3xl border border-zinc-800 bg-zinc-900"
          >
            <img
              :src="photo.thumbnail_url"
              class="aspect-square w-full object-cover"
            />

            <div class="p-4">
              <p class="truncate text-sm">
                {{ photo.title }}
              </p>

              <button
                @click="askDelete(photo)"
                class="mt-4 w-full rounded-2xl bg-red-500/10 px-4 py-3 text-red-400 transition hover:bg-red-500/20"
              >
                Delete Photo
              </button>
            </div>
          </div>
        </div>
      </div>
    </template>

    <UiConfirmModal
      :visible="deleteModalOpen"
      :loading="deleting"
      :title="
        photoToDelete ? `Delete ${photoToDelete.title}?` : 'Delete Photo?'
      "
      message="This will permanently remove the photograph and its original files from storage."
      @cancel="deleteModalOpen = false"
      @confirm="deletePhoto"
    />
  </div>
</template>
