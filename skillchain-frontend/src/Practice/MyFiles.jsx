import React, { useEffect, useState } from "react";
import axios from "axios";

export default function MyFiless({ userId }) {
  const [files, setFiles] = useState([]);

  useEffect(() => {
    axios.get(`http://localhost:8080/api/files/user/${userId}`)
      .then(res => setFiles(res.data));
  }, [userId]);

  return (
    <div>
      <h3>My Files</h3>
      <ul>
        {files.map(file => (
          <li key={file.id}>{file.fileName}</li>
        ))}
      </ul>
    </div>
  );
}
