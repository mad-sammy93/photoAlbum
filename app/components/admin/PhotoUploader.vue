<script setup lang="ts">
import imageCompression from "browser-image-compression";
import type { PhotoUploadAlbum } from "~/types/database.types";

const props = defineProps<{
  albums: PhotoUploadAlbum[];
}>();

const supabase = useSupabaseClient();

const selectedAlbum = ref("");

const uploading = ref(false);

const progress = ref(0);

const uploadedCount = ref(0);

const files = ref<File[]>([]);

function handleFiles(event: Event) {
  const input = event.target as HTMLInputElement;

  files.value = Array.from(input.files || []);
}

async function uploadPhotos() {
  if (!selectedAlbum.value) {
    alert("Please select an album");

    return;
  }

  if (!files.value.length) {
    alert("Please select photos");

    return;
  }

  uploading.value = true;

  uploadedCount.value = 0;

  progress.value = 0;

  try {
    for (let i = 0; i < files.value.length; i++) {
      const file = files.value[i];

      /*
       * Generate thumbnail
       */
      if (!file) {
        continue;
      }
      const thumbnail = await imageCompression(file, {
        maxWidthOrHeight: 600,

        maxSizeMB: 0.3,

        fileType: "image/webp",
      });

      /*
       * Create filenames
       */

      const id = crypto.randomUUID();

      const extension = file.name.split(".").pop();

      const originalPath = `${selectedAlbum.value}/${id}.${extension}`;

      const thumbnailPath = `${selectedAlbum.value}/${id}.webp`;

      /*
       * Upload original
       */

      const { error: originalError } = await supabase.storage
        .from("originals")
        .upload(originalPath, file);

      if (originalError) {
        throw originalError;
      }

      /*
       * Upload thumbnail
       */

      const { error: thumbnailError } = await supabase.storage
        .from("thumbnails")
        .upload(thumbnailPath, thumbnail);

      if (thumbnailError) {
        throw thumbnailError;
      }

      /*
       * Save database record
       */

      const { error: dbError } = await supabase.from("photos").insert({
        album_id: selectedAlbum.value,

        original_path: originalPath,

        thumbnail_path: thumbnailPath,

        title: file.name,

        file_size: file.size,
      });

      if (dbError) {
        throw dbError;
      }

      uploadedCount.value++;

      progress.value = Math.round(((i + 1) / files.value.length) * 100);
    }

    alert("Upload complete 🎉");

    files.value = [];
  } catch (error) {
    console.error(error);

    alert("Upload failed");
  } finally {
    uploading.value = false;
  }
}
</script>

<template>
  <div class="space-y-6 rounded-3xl bg-zinc-900 p-8">
    <div>
      <label class="mb-2 block text-sm text-zinc-400"> Select Album </label>

      <select
        v-model="selectedAlbum"
        class="w-full rounded-xl border border-zinc-700 bg-zinc-950 p-4"
      >
        <option value="">Choose Album</option>

        <option v-for="album in props.albums" :key="album.id" :value="album.id">
          {{ album.title }}
        </option>
      </select>
    </div>

    <div>
      <label class="mb-2 block text-sm text-zinc-400"> Photos </label>

      <input
        type="file"
        multiple
        accept="image/*"
        @change="handleFiles"
        class="block w-full rounded-xl border border-zinc-700 bg-zinc-950 p-4"
      />
    </div>

    <div v-if="files.length" class="text-sm text-zinc-400">
      {{ files.length }}
      photos selected
    </div>

    <div v-if="uploading" class="space-y-3">
      <div class="h-3 overflow-hidden rounded-full bg-zinc-800">
        <div
          class="h-full bg-amber-500 transition-all"
          :style="{
            width: `${progress}%`,
          }"
        />
      </div>

      <p class="text-sm text-zinc-400">
        Uploaded
        {{ uploadedCount }}
        /
        {{ files.length }}
      </p>
    </div>

    <button
      @click="uploadPhotos"
      :disabled="uploading"
      class="rounded-xl bg-amber-500 px-6 py-3 font-medium text-black disabled:opacity-50"
    >
      {{ uploading ? "Uploading..." : "Upload Photos" }}
    </button>
  </div>
</template>
