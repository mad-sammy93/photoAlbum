<script setup lang="ts">
import type { Album, PhotoWithUrls } from "~/types/database.types";
const route = useRoute();

const slug = route.params.slug as string;

const photos = ref<PhotoWithUrls[]>([]);

const album = ref<Album | null>(null);

const page = ref(0);

const loading = ref(false);

const hasMore = ref(true);

const sentinel = ref<HTMLElement | null>(null);

let observer: IntersectionObserver | null = null;

async function loadMore() {
  if (loading.value || !hasMore.value) {
    return;
  }

  loading.value = true;

  const result = await usePhotos(slug, page.value);

  album.value = result.album;

  if (result.photos.length === 0) {
    hasMore.value = false;
  } else {
    const mappedPhotos = result.photos.map((photo: any) => ({
      ...photo,

      orientation:
        photo.height > photo.width
          ? "portrait"
          : photo.width > photo.height
            ? "landscape"
            : "square",
    }));

    photos.value.push(...mappedPhotos);

    page.value++;
  }

  loading.value = false;
}

await loadMore();

/*
 * Lightbox
 */

const showViewer = ref(false);

const selectedIndex = ref(0);

const viewerImages = computed(() =>
  photos.value.map((photo) => photo.original_url),
);

function openViewer(index: number) {
  selectedIndex.value = index;

  showViewer.value = true;
}

function closeViewer() {
  showViewer.value = false;
}

/*
 * Editorial layout
 */

function photoContainerClass(photo: any, index: number) {
  /*
   * Occasionally highlight an image.
   */

  if (photo.orientation === "landscape" && index % 8 === 0) {
    return "lg:scale-[1.02]";
  }

  return "";
}

// const mappedPhotos = result.photos.map((photo) => ({
//   ...photo,

//   orientation:
//     photo.height > photo.width
//       ? "portrait"
//       : photo.width > photo.height
//         ? "landscape"
//         : "square",
// }));
/*
 * Infinite scrolling
 */

onMounted(() => {
  observer = new IntersectionObserver(
    ([entry]) => {
      if (entry && entry.isIntersecting) {
        loadMore();
      }
    },
    {
      rootMargin: "300px",
    },
  );

  if (sentinel.value) {
    observer.observe(sentinel.value);
  }
});

onUnmounted(() => {
  observer?.disconnect();
});
</script>

<template>
  <main
    class="min-h-screen bg-white text-zinc-900 dark:bg-black dark:text-white transition-colors duration-300"
  >
    <ThemeToggle />
    <!-- Header -->
    <section class="mx-auto max-w-7xl px-6 py-24 text-center">
      <p class="text-sm uppercase tracking-[0.5em] text-zinc-500">
        Wedding Memories
      </p>

      <h1 class="mt-6 text-5xl font-serif md:text-7xl">
        {{ album?.title }}
      </h1>

      <p class="mx-auto mt-8 max-w-2xl text-zinc-400">
        {{ album?.description }}
      </p>
    </section>

    <!-- Gallery -->
    <section class="mx-auto max-w-screen-2xl px-6 pb-20">
      <div class="columns-1 gap-5 md:columns-2 xl:columns-3">
        <div
          v-for="(photo, index) in photos"
          :key="photo.id"
          :class="photoContainerClass(photo, index)"
          class="mb-5 break-inside-avoid cursor-pointer overflow-hidden rounded-3xl"
          @click="openViewer(index)"
        >
          <img
            :src="photo.thumbnail_url"
            :alt="photo.title"
            loading="lazy"
            class="w-full transition duration-700 hover:scale-[1.02]"
          />
        </div>
      </div>

      <!-- Infinite Scroll Sentinel -->
      <div ref="sentinel" class="h-24" />

      <!-- Loading -->
      <div v-if="loading" class="py-10 text-center text-zinc-500">
        Loading memories...
      </div>

      <!-- End -->
      <div
        v-if="!hasMore && photos.length"
        class="py-10 text-center text-zinc-600"
      >
        End of album
      </div>
    </section>

    <!-- Lightbox -->
    <GalleryLightboxViewer
      :visible="showViewer"
      :images="viewerImages"
      :index="selectedIndex"
      @close="closeViewer"
      @update:index="selectedIndex = $event"
    />
  </main>
</template>
