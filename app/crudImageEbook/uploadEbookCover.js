import supabase from "@/app/supabaseConfig/supabaseClient";

export async function uploadEbookCover(image){
    const { data, error } = await supabase
    .storage
    .from('cover-bucket')
    .upload(`${image.name}`, image);

    if (error) {
        console.error("Error details:",error);
        throw new Error(`Failed to upload image cover: ${error.message}`);
    }

    return data;
}