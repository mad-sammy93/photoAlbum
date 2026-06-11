import type { Album, PhotoWithUrls } from "~/types/database.types";

export const usePhotos = async (
  slug: string,
  page = 0,
  limit = 6,
): Promise<{
  album: Album;
  photos: PhotoWithUrls[];
}> => {
  const supabase = useSupabaseClient();

  /*
   * Get album
   */

  const { data: album, error: albumError } = await supabase
    .from("albums")
    .select("*")
    .eq("slug", slug)
    .single();

  if (albumError || !album) {
    throw createError({
      statusCode: 404,
      statusMessage: "Album not found",
    });
  }

  /*
   * Get photos
   */

  const from = page * limit;
  const to = from + limit - 1;

  const { data: photos, error: photosError } = await supabase
    .from("photos")
    .select("*")
    .eq("album_id", album.id)
    .order("sort_order", {
      ascending: true,
    })
    .range(from, to);

  if (photosError) {
    throw createError({
      statusCode: 500,
      statusMessage: photosError.message,
    });
  }

  const photosWithUrls = photos.map((photo) => ({
    ...(photo as any),

    thumbnail_url: supabase.storage
      .from("thumbnails")
      .getPublicUrl(photo.thumbnail_path).data.publicUrl,

    original_url: supabase.storage
      .from("originals")
      .getPublicUrl(photo.original_path).data.publicUrl,
  }));

  return {
    album: album as Album,

    photos: photosWithUrls,
  };
};
