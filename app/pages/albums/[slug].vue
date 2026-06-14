<script setup lang="ts">
import type { Album, PhotoWithUrls } from "~/types/database.types";

const route = useRoute();
const slug = route.params.slug as string;
const photos = ref<PhotoWithUrls[]>([]);
const album = ref<Album | null>(null);
const page = ref(0);
const loading = ref(false);
const hasMore = ref(true);
const skeletonCount = 8;
const showViewer = ref(false);
const selectedIndex = ref(0);
const metadataLoaded = ref(false);

const sentinel = ref<HTMLElement | null>(null);
const loadedImages = ref(new Set<string>());

let observer: IntersectionObserver | null = null;

function markImageLoaded(id: string) {
  loadedImages.value.add(id);
}
async function loadMore() {
  if (loading.value || !hasMore.value) {
    return;
  }

  loading.value = true;

  try {
    const result = await usePhotos(slug, page.value);

    album.value = result.album;

    if (result.photos.length === 0) {
      hasMore.value = false;

      return;
    }

    /*
     * Map orientation
     */

    const mappedPhotos: PhotoWithUrls[] = result.photos.map((photo) => ({
      ...photo,

      orientation:
        photo.height > photo.width
          ? "portrait"
          : photo.width > photo.height
            ? "landscape"
            : "square",

      featured: false,
    }));

    /*
     * Editorial rhythm
     *
     * Every ~8 photos,
     * promote the first portrait
     * to featured.
     */

    const groupSize = 8;

    for (
      let groupStart = 0;
      groupStart < mappedPhotos.length;
      groupStart += groupSize
    ) {
      const group = mappedPhotos.slice(groupStart, groupStart + groupSize);

      const portrait = group.find((photo) => photo.orientation === "portrait");

      if (portrait) {
        portrait.featured = true;
      }
    }

    /*
     * Preserve chronological order
     */

    photos.value.push(...mappedPhotos);

    page.value++;
    metadataLoaded.value = false;
  } catch (error) {
    console.error(error);

    hasMore.value = false;
  } finally {
    loading.value = false;
  }
}

await loadMore();

/*
 * Lightbox
 */
const viewerImages = ref<
  {
    src: string;
    width: number;
    height: number;
  }[]
>([]);

async function buildViewerImages() {
  viewerImages.value = await Promise.all(
    photos.value.map(async (photo) => {
      const metadata = await getImageMetadata(photo.original_url);

      let width = metadata?.ExifImageWidth ?? 2000;
      let height = metadata?.ExifImageHeight ?? 1500;

      // Portrait images stored as rotated landscape
      if (
        metadata?.Orientation === "Rotate 90 CW" ||
        metadata?.Orientation === "Rotate 270 CW"
      ) {
        [width, height] = [height, width];
      }

      return {
        src: photo.original_url,
        width,
        height,
      };
    }),
  );
}

async function openViewer(index: number) {
  if (!metadataLoaded.value) {
    await buildViewerImages();

    metadataLoaded.value = true;
  }

  selectedIndex.value = index;

  showViewer.value = true;
}


function closeViewer() {
  showViewer.value = false;
}

/*
 * Editorial layout
 */

function photoContainerClass(photo: PhotoWithUrls) {
  if (photo.featured) {
    return "scale-[1.02]";
  }

  return "";
}

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

const columnCount = computed(() => {
  if (screenWidth.value >= 1280) {
    return 4;
  }

  if (screenWidth.value >= 768) {
    return 2;
  }

  return 1;
});

const photoColumns = computed(() => {
  const columns: PhotoWithUrls[][] = Array.from(
    { length: columnCount.value },
    () => [],
  );

  photos.value.forEach((photo, index) => {
    columns[index % columnCount.value].push(photo);
  });

  return columns;
});

const screenWidth = ref(0);

const handleResize = () => {
  screenWidth.value = window.innerWidth;
};

onMounted(() => {
  handleResize();

  window.addEventListener("resize", handleResize);
});

onUnmounted(() => {
  window.removeEventListener("resize", handleResize);
});
</script>

<template>
  <main class="min-h-screen bg-white text-zinc-900 dark:bg-black dark:text-white transition-colors duration-300">
    <ThemeToggle />
    <!-- Back -->
    <section class="mx-auto max-w-7xl px-6 pt-8">
      <NuxtLink to="/"
        class="fixed left-6 top-6 z-50 inline-flex items-center gap-2 rounded-full border border-zinc-200 dark:border-zinc-800 bg-white/80 dark:bg-black/50 px-5 py-3 text-sm backdrop-blur-xl transition-all duration-300 hover:-translate-x-1">
        ← Back
      </NuxtLink>
    </section>
    <!-- Header -->
    <section class="mx-auto max-w-screen-xl px-6 pb-20 py-24 text-center">
      <p class="text-sm uppercase tracking-[0.5em] text-zinc-500">Memories</p>

      <h1 class="mt-6 text-5xl font-serif md:text-7xl">
        {{ album?.title }}
      </h1>

      <p class="mx-auto mt-8 max-w-2xl text-zinc-400">
        {{ album?.description }}
      </p>
    </section>

    <!-- Gallery -->
    <section class="mx-auto max-w-screen-xl px-6 pb-20">
      <div class="grid gap-5" :class="{
        'grid-cols-1': columnCount === 1,
        'grid-cols-2': columnCount === 2,
        'grid-cols-4': columnCount === 4,
      }">
        <div v-for="(column, columnIndex) in photoColumns" :key="columnIndex" class="space-y-5">
          <div v-for="photo in column" :key="photo.id"
            class="cursor-pointer overflow-hidden rounded-3xl transition-transform duration-500"
            :class="[photo.featured ? 'lg:scale-[1.03]' : '']"
            @click="openViewer(photos.findIndex((p) => p.id === photo.id))">
            <div class="relative">
              <!-- Skeleton -->
              <div v-if="!loadedImages.has(photo.id)"
                class="absolute inset-0 overflow-hidden rounded-3xl bg-zinc-200 dark:bg-zinc-800" :style="{
                  aspectRatio:
                    photo.width && photo.height
                      ? `${photo.width} / ${photo.height}`
                      : '4 / 5',
                }">
                <div class="absolute inset-0 animate-[shimmer_2s_linear_infinite]" />
              </div>

              <!-- Image -->
              <img :src="photo.thumbnail_url" :alt="photo.title ?? ''" loading="lazy" @load="markImageLoaded(photo.id)"
                @error="markImageLoaded(photo.id)"
                class="h-auto w-full rounded-3xl object-cover transition-all duration-700 ease-out hover:scale-[1.02]"
                :class="loadedImages.has(photo.id) ? 'opacity-100' : 'opacity-0'
                  " :ref="(el) => {
                    const img = el as HTMLImageElement | null;

                    if (img && img.complete && !loadedImages.has(photo.id)) {
                      markImageLoaded(photo.id);
                    }
                  }
                  " />
            </div>
          </div>
        </div>
      </div>

      <!-- Infinite Scroll Sentinel -->
      <div ref="sentinel" class="h-24" />

      <!-- Loading -->
      <!-- Infinite Loading Skeletons -->
      <div v-if="loading" class="columns-1 gap-5 md:columns-2 xl:columns-4 text-center">
        Loading Images ...
      </div>

      <!-- End -->
      <div v-if="!hasMore && photos.length" class="py-10 text-center text-zinc-600">
        - fin -
      </div>
    </section>

    <!-- Lightbox -->
    <!-- <GalleryLightboxViewer
      :visible="showViewer"
      :images="viewerImages"
      :index="selectedIndex"
      @close="closeViewer"
      @update:index="selectedIndex = $event"
    /> -->
    <GalleryPhotoViewer :images="viewerImages" :index="selectedIndex" :open="showViewer" @close="closeViewer" />
  </main>
</template>
