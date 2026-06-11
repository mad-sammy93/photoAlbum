<script setup lang="ts">
import draggable from "vuedraggable";
definePageMeta({
  layout: "admin",
  middleware: "auth",
});

const supabase = useSupabaseClient();

const albums = ref([]);

async function fetchAlbums() {
  const { data } = await supabase
    .from("albums")
    .select("*")
    .order("sort_order");

  albums.value = data || [];
}
const deleteModalOpen = ref(false);

const albumToDelete = ref(null);

const deleting = ref(false);

await fetchAlbums();
async function deleteAlbum() {
  if (!albumToDelete.value) {
    return;
  }

  deleting.value = true;

  const { error } = await supabase
    .from("albums")
    .delete()
    .eq("id", albumToDelete.value.id);

  deleting.value = false;

  if (error) {
    alert(error.message);

    return;
  }

  albums.value = albums.value.filter(
    (album) => album.id !== albumToDelete.value.id,
  );

  deleteModalOpen.value = false;

  albumToDelete.value = null;
}
function askDelete(album) {
  albumToDelete.value = album;

  deleteModalOpen.value = true;
}
async function saveOrder() {
  const updates = albums.value.map((album, index) => ({
    id: album.id,

    sort_order: index,
  }));

  await Promise.all(
    updates.map((album) =>
      supabase
        .from("albums")
        .update({
          sort_order: album.sort_order,
        })
        .eq("id", album.id),
    ),
  );
}

async function moveUp(index: number) {
  if (index === 0) {
    return;
  }

  [albums.value[index - 1], albums.value[index]] = [
    albums.value[index],
    albums.value[index - 1],
  ];

  await saveOrder();
}
async function moveDown(index: number) {
  if (index === albums.value.length - 1) {
    return;
  }

  [albums.value[index], albums.value[index + 1]] = [
    albums.value[index + 1],
    albums.value[index],
  ];

  await saveOrder();
}
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
        v-for="(album, index) in albums"
        :key="album.id"
        class="rounded-3xl border border-zinc-800 bg-zinc-900 p-6"
      >
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-5">
            <!-- Position -->
            <div
              class="flex h-12 w-12 items-center justify-center rounded-2xl bg-zinc-800 text-zinc-400"
            >
              {{ index + 1 }}
            </div>

            <div>
              <h2 class="text-xl font-serif text-white">
                {{ album.title }}
              </h2>

              <p class="mt-2 text-zinc-400">
                {{ album.description }}
              </p>
            </div>
          </div>

          <div class="flex items-center gap-2">
            <!-- Up -->
            <button
              :disabled="index === 0"
              @click="moveUp(index)"
              class="rounded-2xl border border-zinc-700 px-4 py-3 text-zinc-300 transition hover:bg-zinc-800 disabled:cursor-not-allowed disabled:opacity-30"
            >
              ↑
            </button>

            <!-- Down -->
            <button
              :disabled="index === albums.length - 1"
              @click="moveDown(index)"
              class="rounded-2xl border border-zinc-700 px-4 py-3 text-zinc-300 transition hover:bg-zinc-800 disabled:cursor-not-allowed disabled:opacity-30"
            >
              ↓
            </button>

            <!-- Edit -->
            <NuxtLink
              :to="`/admin/albums/${album.id}`"
              class="rounded-2xl border border-zinc-700 px-5 py-3 text-zinc-300 transition hover:bg-zinc-800"
            >
              Edit
            </NuxtLink>

            <!-- Delete -->
            <button
              @click="openDeleteModal(album)"
              class="rounded-2xl bg-red-500/10 px-5 py-3 text-red-400 transition hover:bg-red-500/20"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
      <!-- <div
        v-for="album in albums"
        :key="album.id"
        class="rounded-3xl border border-zinc-800 bg-zinc-900 p-8"
      >
        <div class="flex justify-between gap-8">
          <div>
            <h2 class="text-2xl font-serif">
              {{ album.title }}
            </h2>

            <p class="mt-3 text-zinc-400">
              {{ album.description }}
            </p>
          </div>

          <div class="flex gap-3">
            <NuxtLink
              :to="`/admin/albums/${album.id}`"
              class="rounded-xl border border-zinc-700 px-4 py-2 flex items-center"
            >
              Edit
            </NuxtLink>

            <NuxtLink
              :to="`/admin/photos?album=${album.id}`"
              class="rounded-xl bg-amber-500 px-4 py-2 text-black flex items-center"
            >
              Upload
            </NuxtLink>

            <button
              @click="askDelete(album)"
              class="rounded-xl bg-red-500/10 px-4 py-2 text-red-400 flex items-center"
            >
              Delete
            </button>
          </div>
        </div>
      </div> -->
    </div>
    <UiConfirmModal
      :visible="deleteModalOpen"
      :loading="deleting"
      :title="`Delete ${albumToDelete?.title}?`"
      message="
    This will permanently remove the album.
    Associated photos may no longer be accessible.
  "
      @cancel="deleteModalOpen = false"
      @confirm="deleteAlbum"
    />
  </div>
</template>
