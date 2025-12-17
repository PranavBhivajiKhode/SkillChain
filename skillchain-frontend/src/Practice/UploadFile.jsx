import React, { useState } from "react";
import axios from "axios";

export default function UploadFile({ userId }) {
  const [file, setFile] = useState(null);

  const upload = async () => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("userId", userId);

    await axios.post("http://localhost:8080/api/files/upload", formData);
    alert("Uploaded");
  };

  return (
    <div>
      <input type="file" onChange={e => setFile(e.target.files[0])} />
      <button onClick={upload}>Upload</button>
    </div>
  );
}
