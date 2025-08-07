import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import { useAuth } from "../contexts/AuthContext";
import Modal from "./components/Modal";
import { Button } from "antd";
import { Link } from "react-router";
import Loader from "./components/Loading";
import { useNotification } from "../contexts/NotificationContext";
import {
  createFolder,
  deleteFolderById,
  editFolderById,
  getFolders,
} from "../services/folderService";
import Item from "./components/Item";

function Folders() {
  const { createNotification } = useNotification();
  const { token } = useAuth();
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
      const result = await getFolders(token);
      setFolders(result);
    } catch (error) {
      createNotification("error", error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (event) =>
    setForm((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));

  const handleClick = async () => {
    try {
      if (form.folderName.trim() === "") {
        return createNotification("warning", "Folder name cannot be empty!");
      }

      const result = await createFolder(token, form.folderName);

      fetchData();
      setActiveModal("");
      resetForm();
      createNotification("success", result.message);
    } catch (error) {
      createNotification("error", error.message);
    }
  };

  const deleteFolder = async (id) => {
    try {
      const result = await deleteFolderById(token, id);

      fetchData();
      createNotification("success", result.message);
    } catch (error) {
      createNotification("error", error.message);
    }
  };

  const resetForm = () => setForm((prev) => ({ ...prev, folderName: "" }));

  const getFolderIndex = (id) =>
    selectedItems.findIndex((item) => item.id === id);

  const editFolder = async (id) => {
    try {
      const item = selectedItems[getFolderIndex(id)];

      if (item.name.trim() === "") {
        return createNotification("warning", "Folder name cannot be empty!");
      }

      const result = await editFolderById(token, id, item.name);

      setSelectedItems(selectedItems.filter((item) => item.id !== id));
      fetchData();
      createNotification("success", result.message);
    } catch (error) {
      createNotification("error", error.message);
    }
  };

  // ADD ADMIN OPTION TO SEE ALL FOLDERS

  return (
    <>
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
                name="folderName"
                type="text"
                placeholder="Enter folder name..."
                className="w-full rounded-md border border-gray-200 p-1 text-sm focus:outline-sky-300"
                value={form.folderName}
                onChange={handleChange}
              />
              <Button
                text="Create"
                classes={"w-full mt-2"}
                onClick={handleClick}
              />
            </form>
          </Modal>
          <input
            name="search"
            type="text"
            placeholder="Enter folder name..."
            className="mt-2 mb-2 w-full rounded-md border border-gray-200 p-1 text-sm focus:outline-sky-300"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
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
                <Item
                  key={folder.id}
                  item={folder}
                  selectedItems={selectedItems}
                  setSelectedItems={setSelectedItems}
                  save={editFolder}
                >
                  <Link to={`/folders/${folder.id}`}>{folder.name}</Link>
                  <Button
                    color="danger"
                    variant="solid"
                    onClick={() => deleteFolder(folder.id)}
                  >
                    Delete
                  </Button>
                </Item>
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
