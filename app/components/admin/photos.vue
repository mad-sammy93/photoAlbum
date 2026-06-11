<script setup lang="ts">
import type { PhotoUploadAlbum } from "~/types/database.types";
definePageMeta({
  layout: "admin",
  middleware: "auth",
});
const supabase = useSupabaseClient();

const { data } = await supabase.from("albums").select("*");
const albums = ref<PhotoUploadAlbum[]>(data ?? []);
</script>

<template>
  <div>
    <h1 class="text-4xl font-serif mb-8">Photos</h1>

    <AdminPhotoUploader :albums="albums" />
    <button
      @click="setCoverPhoto(photo)"
      class="mt-3 w-full rounded-2xl bg-amber-500/10 px-4 py-3 text-amber-500"
    >
      Set as Cover
    </button>
  </div>
</template>
