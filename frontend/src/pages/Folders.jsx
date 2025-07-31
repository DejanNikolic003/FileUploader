import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import { API_URL } from "../utils/config";
import { useAuth } from "../contexts/AuthContext";
import Modal from "./components/Modal";
import Button from "./components/Button";

import { message } from "antd";

function Folders() {
  const { token } = useAuth();
  const [messageApi, contextHolder] = message.useMessage();

  const [folders, setFolders] = useState([]);
  const [form, setForm] = useState({
    folderName: "",
  });
  const [selectedItems, setSelectedItems] = useState([]);
  const [activeModal, setActiveModal] = useState();
  const [loading, setLoading] = useState(false);

  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchData();
  }, [token]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/folders/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data?.message || "Something went wrong!");
      }

      setFolders(data.folders);
    } catch (error) {
      messageApi.open({
        type: "error",
        content: error.message,
      });
    } finally {
      setLoading(false);
    }
  };

  const createFolder = async () => {
    try {
      if (form.folderName.trim() === "") {
        return messageApi.open({
          type: "warning",
          content: "Folder name cannot be empty!",
        });
      }

      const response = await fetch(`${API_URL}/folders/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          folderName: form.folderName,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data?.message || "Something went wrong!");
      }

      fetchData();
      setActiveModal("");
      resetForm();
      messageApi.open({
        type: "success",
        content: data.message,
      });
    } catch (error) {
      messageApi.open({
        type: "error",
        content: error.message,
      });
    }
  };

  const deleteFolder = async (folderId) => {
    try {
      const response = await fetch(`${API_URL}/folders/${folderId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data?.message || "Something went wrong!");
      }

      fetchData();
      messageApi.open({
        type: "success",
        content: data.message,
      });
    } catch (error) {
      messageApi.open({
        type: "error",
        content: error.message,
      });
    }
  };

  const resetForm = () => setForm((prev) => ({ ...prev, folderName: "" }));

  const isSelected = (id) => selectedItems.find((item) => item.id === id);

  const getFolderIndex = (id) =>
    selectedItems.findIndex((item) => item.id === id);

  const selectFolder = (folder) => {
    if (isSelected(folder.id)) {
      setSelectedItems(selectedItems.filter((item) => item.id !== folder.id));
      return;
    }

    setSelectedItems((prev) => [...prev, folder]);
  };

  const handleChange = (e, folderId) =>
    setSelectedItems((prev) =>
      prev.map((item) =>
        item.id === folderId ? { ...item, name: e.target.value } : item,
      ),
    );

  const editFolder = async (folderId) => {
    try {
      const item = selectedItems[getFolderIndex(folderId)];

      if (item.name.trim() === "") {
        return messageApi.open({
          type: "warning",
          content: "Folder name cannot be empty!",
        });
      }

      const response = await fetch(`${API_URL}/folders/${folderId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          folderName: item.name,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data?.message || "Something went wrong!");
      }

      setSelectedItems(selectedItems.filter((item) => item.id !== folderId));
      fetchData();
      messageApi.open({
        type: "success",
        content: data.message,
      });
    } catch (error) {
      messageApi.open({
        type: "error",
        content: error.message,
      });
    }
  };

  // ADD BETTER ERROR HANDLING, ALERTS, ETC..

  return (
    <>
      {contextHolder}
      <Navbar />
      <section className="pt-5">
        <div className="container mx-auto">
          <Modal
            buttonText={"Create folder"}
            name={"create-modal"}
            activeModal={activeModal}
            setActiveModal={setActiveModal}
          >
            <form>
              <input
                type="text"
                placeholder="Enter folder name..."
                className="w-full rounded-md border border-gray-200 p-1 text-sm focus:outline-sky-300"
                value={form.folderName}
                onChange={(e) =>
                  setForm((prev) => ({
                    ...prev,
                    folderName: e.target.value,
                  }))
                }
              />
              <Button
                text="Create"
                classes={"w-full mt-2"}
                onClick={() => createFolder()}
              />
            </form>
          </Modal>
          <input
            type="text"
            placeholder="Enter folder name..."
            className="mt-2 mb-2 w-full rounded-md border border-gray-200 p-1 text-sm focus:outline-sky-300"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          {loading ? (
            <div role="status">
              <svg
                aria-hidden="true"
                className="h-8 w-8 animate-spin fill-blue-600 text-gray-200"
                viewBox="0 0 100 101"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                  fill="currentColor"
                />
                <path
                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                  fill="currentFill"
                />
              </svg>
              <span className="sr-only">Loading...</span>
            </div>
          ) : folders.length > 0 ? (
            folders
              .filter((folder) => {
                return search.toLowerCase() === ""
                  ? folder
                  : folder.name.toLowerCase().includes(search);
              })
              .map((folder) => (
                <div key={folder.id} className="mb-2 flex items-center gap-1">
                  <div>{folder.name}</div>
                  <Button
                    text="Delete"
                    onClick={() => deleteFolder(folder.id)}
                    type="danger"
                  />
                  <Button
                    text={isSelected(folder.id) ? "Save" : "Edit"}
                    onClick={() =>
                      isSelected(folder.id)
                        ? editFolder(folder.id)
                        : selectFolder(folder)
                    }
                    type="success"
                  />
                  {isSelected(folder.id) && (
                    <div>
                      <input
                        data-id={folder.id}
                        type="text"
                        placeholder="Enter folder name..."
                        className="w-full rounded-md border border-gray-200 p-1 text-sm focus:outline-sky-300"
                        value={selectedItems[getFolderIndex(folder.id)].name}
                        onChange={(e) => handleChange(e, folder.id)}
                      />
                    </div>
                  )}
                </div>
              ))
          ) : (
            <h1>No folders found... :(</h1>
          )}
        </div>
      </section>
    </>
  );
}

export default Folders;
