
import { createClient } from '@supabase/supabase-js'






const url = import.meta.env.VITE_SUPABASE_URL;
const key = import.meta.env.VITE_SUPABASE_KEY;

const supabase = createClient(url, key);

export default function mediaUpload(file) {

    return new Promise((resolve, reject) => {
        if (!file) {
            reject("No file provided");
            return;
        }
        else {
            const timestamp = Date.now();
            const uniqueFileName = `${timestamp}_${file.name}`;
            supabase.storage.from("Images").upload(uniqueFileName, file, {
                upsert: false,
                cacheControl: 3600
            }).then((response) => {
                if (response.error) {
                    reject(response.error.message);
                } else {
                    // For public bucket: use getPublicUrl
                    const imageUrl = supabase.storage.from("Images").getPublicUrl(uniqueFileName).data.publicUrl;
                    resolve(imageUrl);
                }
            });
        }
    });
}


