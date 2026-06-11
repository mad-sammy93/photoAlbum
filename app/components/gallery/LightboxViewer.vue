<script setup lang="ts">
const props = defineProps<{
  visible: boolean;
  images: string[];
  index: number;
}>();

const emit = defineEmits<{
  close: [];
  "update:index": [value: number];
}>();

const currentImage = computed(() => {
  return props.images[props.index];
});

function previous() {
  if (props.index > 0) {
    emit("update:index", props.index - 1);
  }
}

function next() {
  if (props.index < props.images.length - 1) {
    emit("update:index", props.index + 1);
  }
}

function onKeydown(event: KeyboardEvent) {
  if (!props.visible) {
    return;
  }

  if (event.key === "Escape") {
    emit("close");
  }

  if (event.key === "ArrowLeft") {
    previous();
  }

  if (event.key === "ArrowRight") {
    next();
  }
}

onMounted(() => {
  window.addEventListener("keydown", onKeydown);
});

onUnmounted(() => {
  window.removeEventListener("keydown", onKeydown);
});
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
        class="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-sm"
        @click.self="emit('close')"
      >
        <!-- Close -->
        <button
          @click="emit('close')"
          class="absolute right-6 top-6 text-4xl text-white transition hover:text-zinc-400"
        >
          ×
        </button>

        <!-- Previous -->
        <button
          v-if="index > 0"
          @click.stop="previous"
          class="absolute left-6 text-5xl text-white transition hover:text-zinc-400"
        >
          ‹
        </button>

        <!-- Image -->
        <img
          :src="currentImage"
          class="max-h-[90vh] max-w-[90vw] object-contain"
        />

        <!-- Next -->
        <button
          v-if="index < images.length - 1"
          @click.stop="next"
          class="absolute right-6 text-5xl text-white transition hover:text-zinc-400"
        >
          ›
        </button>

        <div class="absolute bottom-6 text-sm text-zinc-400">
          {{ index + 1 }}
          /
          {{ images.length }}
        </div>
      </div>
    </Transition>
  </Teleport>
</template>
