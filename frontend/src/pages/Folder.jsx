import { useNavigate, useParams } from "react-router";
import Navbar from "./components/Navbar";
import { useEffect, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { Button } from "antd";
import Loader from "./components/Loading";
import { getFolderById } from "../services/folderService";
import { downloadFile, getFiles, uploadFile } from "../services/fileService";
import { useNotification } from "../contexts/NotificationContext";

function Folder() {
  const { id } = useParams();
  const { user, token } = useAuth();
  const { createNotification } = useNotification();

  const [folder, setFolder] = useState();
  const [file, setFile] = useState(null);
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { folder } = await getFolderById(token, id);

        if (folder.user_id !== user.id) {
          navigate("/");
          return;
        }

        setFolder(folder);

        const files = await getFiles(token, folder.id);

        setFiles(files);
      } catch (error) {
        createNotification("error", error.message);
      }
    };

    fetchData();
  }, [token]);

  const handleUpload = async () => {
    setLoading(true);
    try {
      if (!file) {
        createNotification("warning", "Select a file to upload!");
        return;
      }

      const formData = new FormData();
      formData.append("file", file);
      formData.append("folderId", folder.id);

      const result = await uploadFile(token, formData);

      createNotification("success", result.message);
      setFiles((prev) => [...prev, result.file]);
    } catch (error) {
      createNotification("error", error.message);
    } finally {
      setLoading(false);
    }
  };

  const onChange = (e) => {
    const { files } = e.target;

    if (files && files.length > 0) {
      setFile(files[0]);
    }
  };

  const handleDownload = async ({ id, original_name }) => {
    try {
      const result = await downloadFile(token, id);

      createDownloadLink(result, original_name);
    } catch (error) {
      createNotification("error", error.message);
    }
  };

  const createDownloadLink = (result, original_name) => {
    const url = window.URL.createObjectURL(result);
    const downloadLink = document.createElement("a");

    downloadLink.href = url;
    downloadLink.download = original_name;
    downloadLink.click();
    window.URL.revokeObjectURL(result);
  };

  return (
    <>
      <Navbar />
      <section className="pt-5">
        <div className="container mx-auto">
          {folder && (
            <div>
              <div className="flex items-center justify-between">
                <h1>{folder.name}</h1>
                <h2>
                  Created at:
                  {new Date(folder.created_at).toLocaleDateString("en-US")}
                </h2>
              </div>
              {loading ? (
                <Loader />
              ) : (
                <form>
                  <input type="file" name="file" onChange={onChange}></input>
                  <Button type="primary" onClick={handleUpload}>
                    Upload file
                  </Button>
                </form>
              )}
              {files &&
                files.map((item) => (
                  <div key={item.id}>
                    <p>{item.original_name}</p>
                    <p>
                      Uploaded at:
                      {new Date(item.created_at).toLocaleDateString("en-US")}
                    </p>
                    <Button type="primary" onClick={() => handleDownload(item)}>
                      Download
                    </Button>
                  </div>
                ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}

export default Folder;
