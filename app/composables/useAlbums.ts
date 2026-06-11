import type { Album, AlbumWithPhotos } from "~/types/database.types";
export const useAlbums = async (): Promise<AlbumWithPhotos[]> => {
  const supabase = useSupabaseClient();

  const { data, error } = await supabase
    .from("albums")
    .select(
      `
      *,
      photos (
        id,
        thumbnail_path,
        sort_order
      )
    `,
    )
    .eq("is_published", true)
    .order("sort_order", {
      ascending: true,
    });

  if (error) {
    throw createError({
      statusCode: 500,
      statusMessage: error.message,
    });
  }

  return (data || []).map((album) => {
    let coverPhoto = album.photos.find(
      (photo: any) => photo.id === album.cover_photo_id,
    );

    if (!coverPhoto) {
      coverPhoto = [...album.photos].sort(
        (a: any, b: any) => a.sort_order - b.sort_order,
      )[0];
    }

    return {
      id: album.id,

      title: album.title,

      slug: album.slug,

      description: album.description,

      photoCount: album.photos.length,

      coverUrl: coverPhoto
        ? supabase.storage
            .from("thumbnails")
            .getPublicUrl(coverPhoto.thumbnail_path).data.publicUrl
        : undefined,
    };
  });
};
