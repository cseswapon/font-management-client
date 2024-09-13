import { useState, useCallback, useRef } from "react";
import axios from "axios";
export default function Home() {
  const [formState, setFormState] = useState({ file: null, message: "" });
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef(null);

  const handleFileChange = useCallback((e) => {
    setFormState((prevState) => ({
      ...prevState,
      file: e.target.files[0],
    }));
  }, []);

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      setLoading(true);
      const { file } = formState;

      if (!file) {
        setFormState((prevState) => ({
          ...prevState,
          message: "Please select a .ttf font file",
        }));
        return;
      }

      const formData = new FormData();
      formData.append("fontFile", file);

      try {
        const response = await axios.post(
          "https://font-management-server.vercel.app/api/upload-font",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        setFormState({
          file: null,
          message: response.data.message,
        });
        setLoading(false);
        fileInputRef.current.value = null;
      } catch (error) {
        setFormState({
          file: null,
          message: "Error uploading file",
        });
      }
    },
    [formState]
  );

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    setFormState((prevState) => ({
      ...prevState,
      file: e.dataTransfer.files[0],
    }));
  }, []);

  return (
    <>
      <div className=" my-10 flex items-center justify-center">
        <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
          <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
            <label
              className="border border-slate-300 rounded-lg p-6 cursor-pointer text-center bg-slate-50 hover:bg-slate-100"
              onDrop={handleDrop}
              onDragOver={(e) => e.preventDefault()}
            >
              {formState.file ? (
                <p>{formState.file.name}</p>
              ) : (
                <p>Click to upload .ttf file</p>
              )}
              <input
                type="file"
                accept=".ttf"
                onChange={handleFileChange}
                ref={fileInputRef}
                className="hidden"
              />
            </label>
            <button
              disabled={loading}
              type="submit"
              className="bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600"
            >
              {loading ? "Uploading file..." : "Upload Font"}
            </button>
            {formState.message && (
              <p
                className={`mt-2 p-2 rounded-lg text-center ${
                  formState.message.includes("Error")
                    ? "bg-red-100 text-red-800"
                    : "bg-green-100 text-green-800"
                }`}
              >
                {formState.message}
              </p>
            )}
          </form>
        </div>
      </div>
    </>
  );
}
