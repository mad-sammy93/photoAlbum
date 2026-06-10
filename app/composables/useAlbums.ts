export const useAlbums = async () => {
  const supabase = useSupabaseClient();

  const { data: albums, error } = await supabase
    .from("albums")
    .select("*")
    .order("sort_order");

  if (error) throw error;

  const albumsWithCounts = await Promise.all(
    albums.map(async (album) => {
      const { count } = await supabase
        .from("photos")
        .select("*", {
          count: "exact",
          head: true,
        })
        .eq("album_id", album.id);

      return {
        ...album,
        photoCount: count || 0,
      };
    }),
  );

  return albumsWithCounts;
};
