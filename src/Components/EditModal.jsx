import { useState, useEffect } from "react";
import axios from "axios";

// eslint-disable-next-line react/prop-types
const EditModal = ({ isOpen, onClose, groupToEdit, onSave }) => {
  const [title, setTitle] = useState("");
  const [fontsGroup, setFontsGroup] = useState([]);

  useEffect(() => {
    if (groupToEdit) {
      // eslint-disable-next-line react/prop-types
      setTitle(groupToEdit?.title);
      // eslint-disable-next-line react/prop-types
      setFontsGroup(groupToEdit?.fontsGroup);
    }
  }, [groupToEdit]);

  const handleSave = async () => {
    try {
      // eslint-disable-next-line react/prop-types
      await axios.put(
        `https://font-management-server.vercel.app/api/groups/${groupToEdit._id}`,
        {
          title,
          fontsGroup,
        }
      );
      onSave();
      onClose();
    } catch (error) {
      console.error("Error updating group:", error);
      alert("Failed to update group. Please try again.");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-600 bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-md w-1/2">
        <h2 className="text-xl font-semibold mb-4">Edit Font Group</h2>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Group Title"
          className="w-full p-2 border border-gray-300 rounded mb-4"
        />
        {fontsGroup.map((row, index) => (
          <div key={index} className="grid grid-cols-4 gap-2 items-center mb-2">
            <input
              type="text"
              value={row.fontName}
              onChange={(e) => {
                const newFontsGroup = [...fontsGroup];
                newFontsGroup[index].fontName = e.target.value;
                setFontsGroup(newFontsGroup);
              }}
              placeholder="Font name"
              className="p-2 border border-gray-300 rounded"
            />
            <input
              type="text"
              value={row.selectFond}
              onChange={(e) => {
                const newFontsGroup = [...fontsGroup];
                newFontsGroup[index].selectFond = e.target.value;
                setFontsGroup(newFontsGroup);
              }}
              placeholder="Select font"
              className="p-2 border border-gray-300 rounded"
            />
            <input
              type="number"
              value={row.fontSize}
              onChange={(e) => {
                const newFontsGroup = [...fontsGroup];
                newFontsGroup[index].fontSize = e.target.value;
                setFontsGroup(newFontsGroup);
              }}
              placeholder="Font size"
              className="p-2 border border-gray-300 rounded"
            />
            <input
              type="number"
              value={row.priceCharge}
              onChange={(e) => {
                const newFontsGroup = [...fontsGroup];
                newFontsGroup[index].priceCharge = e.target.value;
                setFontsGroup(newFontsGroup);
              }}
              placeholder="Price Charge"
              className="p-2 border border-gray-300 rounded"
            />
          </div>
        ))}
        <div className="flex justify-end space-x-2 mt-3">
          <button
            onClick={onClose}
            className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditModal;
