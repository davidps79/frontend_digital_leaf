import supabase from "@/app/supabaseConfig/supabaseClient";

export async function downloadEbook(filePath){
    const { data, error } = await supabase
    .storage
    .from('ebooks-bucket')
    .download(`${filePath}`);

    if(error){
        console.error('Error al obtener el epub ', error)
        return null;
    }

    return data;
}
