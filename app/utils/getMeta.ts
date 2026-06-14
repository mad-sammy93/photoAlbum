import exifr from "exifr";

export async function getImageMetadata(url: string) {
  try {
    const data = await exifr.parse(url, [
      "Orientation",
      "ExifImageWidth",
      "ExifImageHeight",
    ]);

    return data;
  } catch (error) {
    console.error(error);

    return null;
  }
}
