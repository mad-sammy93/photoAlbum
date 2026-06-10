<script setup lang="ts">
const route = useRoute();

const slug = route.params.slug as string;

const { album, photos } = await usePhotos(slug);

const showViewer = ref(false);

const selectedIndex = ref(0);

const viewerImages = computed(() => photos.map((photo) => photo.original_url));

function openViewer(index: number) {
  selectedIndex.value = index;

  showViewer.value = true;
}

function closeViewer() {
  showViewer.value = false;
}
</script>
<section class="mx-auto max-w-7xl px-6 pb-20">
    <GalleryPhotoGrid
        :photos="photos"
        @open="openViewer"
    />

</section>

<GalleryLightboxViewer
  :visible="showViewer"
  :images="viewerImages"
  :index="selectedIndex"
  @close="closeViewer"
  @update-index="selectedIndex = $event"
/>
