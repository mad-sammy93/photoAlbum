<script setup lang="ts">
definePageMeta({
  layout: "admin",
  middleware: "auth",
});

const router = useRouter();
const supabase = useSupabaseClient();

const title = ref("");
const description = ref("");

const saving = ref(false);

async function createAlbum() {
  if (!title.value.trim()) {
    alert("Album title is required");
    return;
  }

  saving.value = true;

  try {
    const slug = title.value.toLowerCase().trim().replace(/\s+/g, "-");

    const { error } = await supabase.from("albums").insert({
      title: title.value,
      slug,
      description: description.value,
    });

    if (error) {
      throw error;
    }

    router.push("/admin/albums");
  } catch (error: any) {
    console.error(error);

    alert(error.message);
  } finally {
    saving.value = false;
  }
}
</script>

<template>
  <div class="max-w-3xl">
    <div class="mb-10">
      <h1 class="text-4xl font-serif">Create Album</h1>

      <p class="mt-2 text-zinc-400">Add a new wedding collection.</p>
    </div>

    <div class="space-y-6 rounded-3xl border border-zinc-800 bg-zinc-900 p-8">
      <div>
        <label class="mb-2 block text-sm text-zinc-400"> Album Title </label>

        <input
          v-model="title"
          type="text"
          class="w-full rounded-xl bg-zinc-950 p-4"
          placeholder="Haldi"
        />
      </div>

      <div>
        <label class="mb-2 block text-sm text-zinc-400"> Description </label>

        <textarea
          v-model="description"
          rows="4"
          class="w-full rounded-xl bg-zinc-950 p-4"
          placeholder="A joyful celebration..."
        />
      </div>

      <button
        @click="createAlbum"
        :disabled="saving"
        class="rounded-xl bg-amber-500 px-6 py-3 font-medium text-black disabled:opacity-50"
      >
        {{ saving ? "Creating..." : "Create Album" }}
      </button>
    </div>
  </div>
</template>
