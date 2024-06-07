import supabase from "./supabase";
import { supabaseUrl } from "./supabase";

export async function getCabins() {
  const { data: cabins, error } = await supabase.from("cabins").select("*");

  if (error) {
    console.log(error);
    throw new Error("Cabins could not be loaded.");
  }

  return cabins;
}

export async function createCabinAPI(newCabin) {
  // hasImagePath case is for when we are duplicating a cabin
  const hasImagePath = newCabin.image.startsWith(supabaseUrl);
  let uploadError = "";
  let imageUploadedUrl = hasImagePath ? newCabin.image : null;

  if (!hasImagePath) {
    ({ uploadError, imageUploadedUrl } = await uploadImage(newCabin.image));
  }

  if (uploadError) {
    throw new Error(uploadError.message);
  } else {
    // If no upload to storage error
    // Insert data into the cabin table with the ImageUrl and other input data
    const { data, error: insertError } = await supabase
      .from("cabins")
      .insert([{ ...newCabin, image: imageUploadedUrl }])
      .select();
    if (insertError) {
      throw new Error("Couldn't create the cabin");
    }

    return data;
  }
}

export async function editCabinAPI({ id, updateObj }) {
  if (updateObj.image) {
    const { uploadError, imageUploadedUrl } = await uploadImage(
      updateObj.image
    );
    if (uploadError) {
      throw new Error(uploadError.message);
    }
    updateObj = { ...updateObj, image: imageUploadedUrl };
  }

  // Edit data into the cabin row
  const { data, error: insertError } = await supabase
    .from("cabins")
    .update(updateObj)
    .eq("id", id);

  if (insertError) {
    throw new Error("Couldn't update the cabin");
  }

  return data;
}

async function uploadImage(image) {
  // Make an unique image name with a random number at begining and the org image name
  const imageName = `${Math.random()}-${image.name}`.replaceAll("/", "");

  // Upload to our bucket
  const { error: uploadError } = await supabase.storage
    .from("cabin-images")
    .upload(imageName, image);
  const imageUploadedUrl = `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;

  return { uploadError, imageUploadedUrl };
}

export async function deleteCabinAPI(id) {
  const { data, error } = await supabase.from("cabins").delete().eq("id", id);

  if (error) {
    console.log(error);
    throw new Error("Cabin could not be deleted");
  }

  return data;
}
