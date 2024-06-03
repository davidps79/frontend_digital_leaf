import supabase from "@/app/supabaseConfig/supabaseClient";

export async function uploadEbook(title,fileData){
    const { data, error } = await supabase
    .storage
    .from('ebooks-bucket')
    .upload(`${title}.epub`, fileData);

    if (error) {
        console.error("Error details:",error);
        throw new Error(`Failed to upload EPUB: ${error.message}`);
    }

    return data;
}