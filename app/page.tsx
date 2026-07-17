import UploadForm from "../components/UploadForm";

export default function Home() {
  return (
    <main className="p-10">

      <h1 className="text-4xl font-bold text-center mb-10">
        ShutterSpace 📸
      </h1>

      <UploadForm />

    </main>
  );
}