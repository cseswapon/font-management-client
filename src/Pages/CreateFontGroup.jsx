import axios from "axios";
import { useState, useCallback, useEffect } from "react";

export default function CreateFontGroup() {
  const [title, setTitle] = useState("");
  const [selectFontData, setSelectFontData] = useState([]);
  const [rows, setRows] = useState([
    { fontName: "", selectFond: "", fontSize: "", priceCharge: "" },
  ]);

  const addRow = () => {
    setRows([
      ...rows,
      { fontName: "", selectFond: "", fontSize: "", priceCharge: "" },
    ]);
  };

  const handleRowChange = (index, field, value) => {
    const newRows = rows.slice();
    newRows[index] = { ...newRows[index], [field]: value };
    // console.log(newRows);
    setRows(newRows);
  };

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      const body = {
        title,
        fontsGroup: rows,
      };

      try {
        await axios.post(
          "https://font-management-server.vercel.app/api/groups",
          body
        );
        setTitle("");
        setRows([
          { fontName: "", selectFond: "", fontSize: "", priceCharge: "" },
        ]);
        alert("Data saved successfully!");
      } catch (error) {
        console.error("Error saving data:", error);
        alert("Failed to save data. Please try again.");
      }
    },
    [rows, title]
  );

  useEffect(() => {
    (async function () {
      const data = await axios.get(
        "https://font-management-server.vercel.app/api/get-all-fonts"
      );
      // console.log(data);
      setSelectFontData(data?.data?.fonts?.map((item) => item?.split("_")[0]));
    })();
  }, []);

  // console.log(selectFontData);
  return (
    <form onSubmit={handleSubmit} className="p-4 space-y-4 container mx-auto">
      <h1 className="text-2xl font-semibold mb-2">Create a Font Group</h1>
      <p className="text-gray-700 mb-4">
        You have to select at least two fonts
      </p>

      <input
        type="text"
        placeholder="Group Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full p-2 border border-gray-300 rounded"
      />

      {rows.map((row, index) => (
        <div key={index} className="grid grid-cols-5 gap-2 items-center mb-2">
          <input
            type="text"
            placeholder="Font name"
            value={row.fontName}
            onChange={(e) => handleRowChange(index, "fontName", e.target.value)}
            className="p-2 border border-gray-300 rounded"
          />
          <select
            value={row.selectFond}
            onChange={(e) =>
              handleRowChange(index, "selectFond", e.target.value)
            }
            className="p-2 border border-gray-300 rounded"
          >
            <option value="">Select font</option>
            {selectFontData.map((item, i) => (
              <option key={i} value={item}>
                {item}
              </option>
            ))}
          </select>
          <input
            type="number"
            placeholder="Font size"
            value={row.fontSize}
            onChange={(e) => handleRowChange(index, "fontSize", e.target.value)}
            className="p-2 border border-gray-300 rounded"
          />
          <input
            type="number"
            placeholder="Price Charge"
            value={row.priceCharge}
            onChange={(e) =>
              handleRowChange(index, "priceCharge", e.target.value)
            }
            className="p-2 border border-gray-300 rounded"
          />
          <button
            type="button"
            onClick={() => {
              const newRows = rows.slice();
              newRows.splice(index, 1);
              setRows(newRows);
            }}
            className="text-red-500 hover:text-red-700 border h-full"
          >
            Delete
          </button>
        </div>
      ))}

      <div className="flex justify-between items-center mt-4">
        <button
          type="button"
          onClick={addRow}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          + Add Row
        </button>
        <button
          type="submit"
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        >
          Create
        </button>
      </div>
    </form>
  );
}
