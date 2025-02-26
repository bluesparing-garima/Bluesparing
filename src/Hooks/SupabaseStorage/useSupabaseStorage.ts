import { useState } from "react";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export const useSupabaseStorage = () => {
  const [uploading, setUploading] = useState(false);
  const [downloading, setDownloading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // 📌 Upload File
  const uploadFile = async (bucket: string, file: File) => {
    setUploading(true);
    setError(null);

    const filePath = `${Date.now()}-${file.name}`; // Unique file name
    const { data, error } = await supabase.storage
      .from(bucket)
      .upload(filePath, file);

    setUploading(false);
    if (error) {
      setError(error.message);
      return null;
    }
    return data?.path; // Returns file path
  };

  // 📌 Download File (Get Public URL)
  const getFileUrl = async (bucket: string, path: string) => {
    setDownloading(true);
    setError(null);

    const { data } = supabase.storage.from(bucket).getPublicUrl(path);

    setDownloading(false);
    return data.publicUrl; // Returns the public URL of the file
  };

  return {
    uploadFile,
    getFileUrl,
    uploading,
    downloading,
    error,
  };
};
