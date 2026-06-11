<script setup lang="ts">
definePageMeta({
  layout: "admin",
});

const route = useRoute();
const router = useRouter();

const supabase = useSupabaseClient();

const title = ref("");
const description = ref("");
const isPublished = ref(true);

const loading = ref(true);
const saving = ref(false);

async function loadAlbum() {
  const { data, error } = await supabase
    .from("albums")
    .select("*")
    .eq("id", route.params.id)
    .single();

  if (error) {
    console.error(error);
    return;
  }

  title.value = data.title;
  description.value = data.description || "";
  isPublished.value = data.is_published;

  loading.value = false;
}

async function saveAlbum() {
  saving.value = true;

  const slug = title.value.toLowerCase().trim().replace(/\s+/g, "-");

  const { error } = await supabase
    .from("albums")
    .update({
      title: title.value,
      description: description.value,
      slug,
      is_published: isPublished.value,
    })
    .eq("id", route.params.id);

  saving.value = false;

  if (error) {
    alert(error.message);
    return;
  }

  router.push("/admin/albums");
}

onMounted(loadAlbum);
</script>

<template>
  <div class="max-w-4xl">
    <h1 class="mb-8 text-4xl font-serif">Edit Album</h1>

    <div v-if="!loading" class="space-y-6 rounded-3xl bg-zinc-900 p-8">
      <input
        v-model="title"
        placeholder="Album title"
        class="w-full rounded-2xl bg-black p-4"
      />

      <textarea
        v-model="description"
        rows="5"
        placeholder="Description"
        class="w-full rounded-2xl bg-black p-4"
      />

      <label class="flex items-center gap-3">
        <input v-model="isPublished" type="checkbox" />

        Published
      </label>

      <button
        :disabled="saving"
        @click="saveAlbum"
        class="rounded-2xl bg-amber-500 px-6 py-3 text-black"
      >
        {{ saving ? "Saving..." : "Save Changes" }}
      </button>
    </div>
  </div>
</template>
