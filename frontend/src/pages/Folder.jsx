import { useNavigate, useParams } from "react-router";
import Navbar from "./components/Navbar";
import { useEffect, useState } from "react";
import { API_URL } from "../utils/config";
import { useAuth } from "../contexts/AuthContext";
import { Button } from "antd";
import Loader from "./components/Loading";

function Folder() {
  const { id } = useParams();
  const { token } = useAuth();

  const [folder, setFolder] = useState();
  const [file, setFile] = useState(null);
  const [files, setFiles] = useState([]);

  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${API_URL}/folders/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const result = await response.json();

        if (!response.ok) {
          navigate("/folders");
          return;
        }

        setFolder(result.folder);

        await getFiles(result.folder.id);
      } catch (error) {
        console.log(error);
      }
    };

    const getFiles = async (id) => {
      try {
        const response = await fetch(`${API_URL}/files/folders/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const result = await response.json();

        setFiles(result.files);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [token]);

  const uploadFile = async () => {
    setLoading(true);
    try {
      if (!file) {
        return;
      }
      const formData = new FormData();
      formData.append("file", file);
      formData.append("folderId", folder.id);

      const response = await fetch(`${API_URL}/files/upload`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      const result = await response.json();

      console.log(result);
    } catch (error) {
      console.error(error);
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

  const downloadFile = async ({ id, original_name }) => {
    try {
      const response = await fetch(`${API_URL}/files/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const result = await response.blob();

      const url = window.URL.createObjectURL(result);
      const downloadLink = document.createElement("a");

      downloadLink.href = url;
      downloadLink.download = original_name;
      downloadLink.click();
      window.URL.revokeObjectURL(result);
    } catch (error) {
      console.log(error.message);
    }
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
                  <Button type="primary" onClick={uploadFile}>
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
                    <Button type="primary" onClick={() => downloadFile(item)}>
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
