<script setup lang="ts">
import { watch } from "vue";
import PhotoSwipeLightbox from "photoswipe/lightbox";
import "photoswipe/style.css";

const colorMode = useColorMode();

const props = defineProps<{
    images: {
        src: string;
        width: number;
        height: number;
    }[];
    index: number;
    open: boolean;
}>();

const emit = defineEmits(["close"]);

let lightbox: PhotoSwipeLightbox | null = null;

watch(
    () => props.open,
    async (value) => {
        if (!value) {
            lightbox?.destroy();
            lightbox = null;

            return;
        }

        const dataSource = props.images;

        lightbox = new PhotoSwipeLightbox({
            dataSource,
            pswpModule: () => import("photoswipe"),
            showHideAnimationType: "fade",
            initialZoomLevel: "fit",
            secondaryZoomLevel: 1,
            maxZoomLevel: 2,
            wheelToZoom: true,
            pinchToClose: true,
            escKey: true,
            arrowKeys: true,
            bgOpacity: 1,
            mainClass: 'pswp--custom-bg',

            gallery: '#gallery--custom-bg',
            paddingFn: (viewportSize) => ({
                top: viewportSize.y * 0.08,    // 8% of viewport height
                bottom: viewportSize.y * 0.08,
                left: 20,
                right: 20,
            }),
        });

        lightbox.on("close", () => {
            emit("close");
        });

        lightbox.init();

        lightbox.loadAndOpen(props.index);
    },
);
</script>

<template>
    <div />
</template>
<style>
/* .pswp--custom-bg .pswp__bg {
  background: white !important;
} */
/* Light mode */
.pswp--custom-bg .pswp__bg {
    background: white !important;
}

/* Dark mode */
.dark .pswp--custom-bg .pswp__bg {
    background: black !important;
}

.pswp__preloader {
    display: block !important;
    opacity: 1 !important;
}

.pswp__preloader .pswp__icn {
    width: 48px;
    height: 48px;
}
</style>
