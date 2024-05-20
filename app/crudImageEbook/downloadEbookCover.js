import supabase from "@/app/supabaseConfig/supabaseClient";

export async function downloadEbookCover(imagePath){
    const { data, error } = await supabase
    .storage
    .from('cover-bucket')
    .download(`${imagePath}`);

    if(error){
        console.log('Error al obtener la imagen ', error)
        return null;
    }
    console.log(data);
    return data;
}
