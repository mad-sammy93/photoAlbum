<script setup>
definePageMeta({
  layout: "admin",
  middleware: "auth",
});

const supabase = useSupabaseClient();

const { data: albums } = await supabase.from("albums").select("*");
</script>

<template>
  <div>
    <h1 class="text-4xl font-serif mb-8">Photos</h1>

    <PhotoUploader :albums="albums" />
  </div>
</template>
