<script setup>
const emit = defineEmits(["saved"]);

const title = ref("");
const description = ref("");

const supabase = useSupabaseClient();

async function save() {
  await supabase.from("albums").insert({
    title: title.value,

    slug: title.value.toLowerCase().replaceAll(" ", "-"),

    description: description.value,
  });

  emit("saved");
}
</script>

<template>
  <div class="space-y-4">
    <input
      v-model="title"
      placeholder="Album Title"
      class="w-full p-4 rounded-xl bg-zinc-900"
    />

    <textarea
      v-model="description"
      placeholder="Description"
      class="w-full p-4 rounded-xl bg-zinc-900"
    />

    <button @click="save" class="bg-amber-500 px-4 py-2 rounded-xl text-black">
      Save Album
    </button>
  </div>
</template>
