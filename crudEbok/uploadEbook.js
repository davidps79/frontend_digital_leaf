import supabase from "@/app/supabaseConfig/supabaseClient";

export async function uploadEbook(title,fileData){
    console.log("Archivo",fileData);
    const { data, error } = await supabase
    .storage
    .from('ebooks-bucket')
    .upload(`${title}.pdf`, fileData);

    if (error) {
        console.error("Error details:",error);
        throw new Error(`Failed to upload PDF: ${error.message}`);
    }

    return data;
}