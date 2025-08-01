import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import { API_URL } from "../utils/config";
import { useAuth } from "../contexts/AuthContext";
import Modal from "./components/Modal";
import Button from "./components/Button";

import { message } from "antd";
import { Link } from "react-router";
import Loader from "./components/Loading";

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

  // ADD ADMIN OPTION TO SEE ALL FOLDERS

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
            <Loader />
          ) : // REFACTOR SEARCHING | ADD LOADING STATE, NOT FOUND, ETC..
          folders.length > 0 ? (
            folders
              .filter((folder) => {
                return search.toLowerCase() === ""
                  ? folder
                  : folder.name.toLowerCase().includes(search);
              })
              .map((folder) => (
                <div key={folder.id} className="mb-2 flex items-center gap-1">
                  <Link to={`/folders/${folder.id}`}>{folder.name}</Link>
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
