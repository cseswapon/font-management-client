import { useState, useEffect, useCallback } from "react";
import axios from "axios";

function ListFonts() {
  const [state, setState] = useState({
    fonts: [],
    loading: true,
  });

  useEffect(() => {
    const fetchFonts = async () => {
      try {
        const response = await axios.get(
          "https://font-management-server.vercel.app/api/get-all-fonts"
        );
        const fontFiles = response?.data?.fonts;

        const style = document.createElement("style");
        style.type = "text/css";
        document.head.appendChild(style);

        let styles = "";
        fontFiles.forEach((fontFile) => {
          const fontFamily = fontFile.split("-")[0].replace(/_/g, " ");
          const fontUrl = `https://font-management-server.vercel.app/uploads/${fontFile}`;
          styles += `
            @font-face {
              font-family: '${fontFamily}';
              src: url('${fontUrl}') format('truetype');
            }
          `;
        });
        style.textContent = styles;

        setState({
          fonts: fontFiles.map((file) => ({
            fullName: file,
            name: file.split("-")[0].replace(/_/g, " "),
            url: `https://font-management-server.vercel.app/uploads/${file}`,
          })),
          loading: false,
        });
      } catch (error) {
        console.error("Error fetching fonts", error);
        setState({ fonts: [], loading: false });
      }
    };

    fetchFonts();
  }, []);

  const handleDelete = useCallback(async (fontName) => {
    const confirmed = window.confirm(
      `Are you sure you want to delete the font "${fontName}"?`
    );

    if (confirmed) {
      try {
        await axios.delete(
          `https://font-management-server.vercel.app/api/delete-font/${fontName}`
        );
        setState((prevState) => ({
          ...prevState,
          fonts: prevState.fonts.filter((font) => font.fullName !== fontName),
        }));
      } catch (error) {
        console.error("Error deleting font", error);
      }
    }
  }, []);

  const { fonts, loading } = state;

  if (loading) {
    return <div>Loading fonts...</div>;
  }

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold text-gray-800 mb-4">List Fonts</h1>
      <div className="overflow-x-auto">
        {fonts.length > 0 ? (
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Preview
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {fonts.map((font, index) => (
                <tr key={index}>
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">
                    {font.name}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    <p style={{ fontFamily: font.name }}>Sample text</p>
                  </td>
                  <td className="px-6 py-4 text-sm font-medium">
                    <button
                      onClick={() => handleDelete(font.fullName)}
                      className="text-red-600 hover:text-red-900"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No fonts available.</p>
        )}
      </div>
    </div>
  );
}

export default ListFonts;
