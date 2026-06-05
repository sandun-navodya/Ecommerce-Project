import { useState } from "react";
import mediaUpload from "./utils/mediaUpload";

export default function Test() {
    const [file, setFile] = useState(null);

  async  function handleUpload() {
        try {
            const url = await mediaUpload(file);
            console.log("File uploaded successfully. Public URL:", url);
            alert("File uploaded successfully! URL: " + url);
        } catch (error) {
            console.error("Unexpected error:", error);
            alert("Unexpected error: " + error);
        }

    }
    return (
        <div className='w-full h-screen flex flex-col justify-center items-center'>
            <input type="file" onChange={
                (e) => setFile(e.target.files[0])
            } />
            <button onClick={handleUpload} className='flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded mt-4'>upload</button>
        </div>);

}
