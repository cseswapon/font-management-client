import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import EditModal from "../Components/EditModal";

export default function FontGroupList() {
  const [data, setData] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [groupToEdit, setGroupToEdit] = useState(null);

  const fetchData = useCallback(async () => {
    try {
      const response = await axios.get(
        "https://font-management-server.vercel.app/api/groups"
      );
      if (response.status === 200) {
        setData(response.data);
      } else {
        console.error("Failed to fetch data");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }, []);

  const handleDelete = useCallback(async (id) => {
    if (window.confirm("Are you sure you want to delete this group?")) {
      try {
        await axios.delete(
          `https://font-management-server.vercel.app/api/groups/${id}`
        );
        setData((prevData) => prevData.filter((group) => group._id !== id));
      } catch (error) {
        console.error("Error deleting group:", error);
        alert("Failed to delete group. Please try again.");
      }
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const openEditModal = (group) => {
    setGroupToEdit(group);
    setModalOpen(true);
  };

  const closeEditModal = () => {
    setModalOpen(false);
    setGroupToEdit(null);
  };

  const handleSave = () => {
    fetchData(); // Refresh data after saving changes
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold text-gray-800 mb-4">Font Groups</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-sm">
          <thead className="bg-gray-100 text-gray-600">
            <tr>
              <th className="py-2 px-4 border-b">Name</th>
              <th className="py-2 px-4 border-b">Fonts</th>
              <th className="py-2 px-4 border-b">Count</th>
              <th className="py-2 px-4 border-b">Action</th>
            </tr>
          </thead>
          <tbody>
            {data.map((group) => (
              <tr key={group._id} className="hover:bg-gray-50">
                <td className="py-2 px-4 text-center border-b">
                  {group.title}
                </td>
                <td className="py-2 px-4 text-center border-b">
                  {group.fontsGroup.map((item, i) => (
                    <span
                      title={item.fontName}
                      key={i}
                      className="inline-block max-w-xs truncate"
                    >
                      {item.fontName}
                    </span>
                  ))}
                </td>
                <td className="py-2 px-4 text-center border-b">
                  {group.fontsGroup.length}
                </td>
                <td className="py-2 px-4 border-b flex space-x-2 items-center justify-center">
                  <button
                    onClick={() => openEditModal(group)}
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(group._id)}
                    className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {modalOpen && (
        <EditModal
          isOpen={modalOpen}
          onClose={closeEditModal}
          groupToEdit={groupToEdit}
          onSave={handleSave}
        />
      )}
    </div>
  );
}
