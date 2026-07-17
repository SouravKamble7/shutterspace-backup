"use client";

import { useState } from "react";
import { supabase } from "../lib/supabase";

export default function UploadForm() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");

  async function uploadPhoto() {
    if (!file) {
      setMessage("Please select an image.");
      return;
    }

    try {
      const fileName = `${Date.now()}-${file.name.replace(/\s+/g, "_")}`;

      console.log("Uploading file:", fileName);

      // Upload to Storage
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from("photos")
        .upload(fileName, file);

      console.log("Storage Upload Data:", uploadData);
      console.log("Storage Upload Error:", uploadError);

      if (uploadError) {
        setMessage("Storage Error: " + uploadError.message);
        return;
      }

      // Get Public URL
      const { data: publicData } = supabase.storage
        .from("photos")
        .getPublicUrl(fileName);

      console.log("Public URL:", publicData.publicUrl);

      // Save to Database
      const { data: insertData, error: insertError } = await supabase
        .from("photos")
        .insert([
          {
            title: title,
            description: description,
            image_url: publicData.publicUrl,
          },
        ])
        .select();

      console.log("Database Insert Data:", insertData);
      console.log("Database Insert Error:", insertError);

      if (insertError) {
        setMessage("Database Error: " + insertError.message);
        return;
      }

      setMessage("✅ Photo uploaded successfully!");

      setTitle("");
      setDescription("");
      setFile(null);
    } catch (err) {
      console.error(err);
      setMessage("Unexpected Error: " + err.message);
    }
  }

  return (
    <div className="max-w-md mx-auto p-6">
      <h2 className="text-2xl font-bold mb-5">
        Upload Photo 📸
      </h2>

      <input
        className="border p-2 w-full mb-3"
        placeholder="Photo title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <textarea
        className="border p-2 w-full mb-3"
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <input
        type="file"
        accept="image/*"
        className="mb-3"
        onChange={(e) => setFile(e.target.files[0])}
      />

      <br />

      <button
        onClick={uploadPhoto}
        className="bg-blue-600 text-white px-5 py-2 rounded"
      >
        Upload
      </button>

      <p className="mt-4 font-semibold">{message}</p>
    </div>
  );
}