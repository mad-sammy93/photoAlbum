export const usePhotos = async (slug: string) => {
  const supabase = useSupabaseClient();

  /*
   * Get album first
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

  const { data: photos, error: photosError } = await supabase
    .from("photos")
    .select("*")
    .eq("album_id", album.id)
    .order("sort_order");

  if (photosError) {
    throw createError({
      statusCode: 500,
      statusMessage: photosError.message,
    });
  }

  const photosWithUrls = photos.map((photo) => ({
    ...photo,

    thumbnail_url: supabase.storage
      .from("thumbnails")
      .getPublicUrl(photo.thumbnail_path).data.publicUrl,

    original_url: supabase.storage
      .from("originals")
      .getPublicUrl(photo.original_path).data.publicUrl,
  }));

  return {
    album,

    photos: photosWithUrls,
  };
};
