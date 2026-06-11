<script setup lang="ts">
defineProps<{
  visible: boolean;
  title: string;
  message: string;
  loading?: boolean;
}>();

const emit = defineEmits<{
  confirm: [];
  cancel: [];
}>();
</script>

<template>
  <Teleport to="body">
    <Transition
      enter-active-class="transition duration-300"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition duration-200"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div
        v-if="visible"
        class="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm px-4"
      >
        <div
          class="w-full max-w-md rounded-3xl border border-zinc-800 bg-zinc-950 p-8 shadow-2xl"
        >
          <div class="mb-6">
            <p class="text-xs uppercase tracking-[0.4em] text-amber-500">
              Confirmation Required
            </p>

            <h2 class="mt-3 text-3xl font-serif text-white">
              {{ title }}
            </h2>

            <p class="mt-5 text-zinc-400">
              {{ message }}
            </p>
          </div>

          <div class="flex justify-end gap-4">
            <button
              @click="emit('cancel')"
              :disabled="loading"
              class="rounded-2xl border border-zinc-700 px-6 py-3 text-zinc-300 transition hover:bg-zinc-900"
            >
              Cancel
            </button>

            <button
              @click="emit('confirm')"
              :disabled="loading"
              class="rounded-2xl bg-red-500/10 px-6 py-3 font-medium text-red-400 transition hover:bg-red-500/20"
            >
              {{ loading ? "Deleting..." : "Delete Item" }}
            </button>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>
