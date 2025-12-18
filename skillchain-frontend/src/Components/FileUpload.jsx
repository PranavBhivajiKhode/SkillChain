"use client"
import { useState } from "react"
import { uploadFileApiService } from "./Api/FileApiService";

const FileUpload = ({
  uploadType = "MILESTONE",
  entityId,
  userType = "CLIENT",
  onUploadSuccess, // Now expects (List<FileEntity>)
  maxFiles = 5,
  maxFileSize = 10 * 1024 * 1024,
  acceptedTypes = "*/*",
}) => {
  const [selectedFiles, setSelectedFiles] = useState([])
  const [uploading, setUploading] = useState(false)
  const [uploadStatus, setUploadStatus] = useState(null)
  const [errorMessage, setErrorMessage] = useState("")

  const handleFileSelect = (event) => {
    try {
      const fileList = event.target.files
      if (!fileList || fileList.length === 0) return

      const filesArray = Array.from(fileList)

      if (filesArray.length + selectedFiles.length > maxFiles) {
        setErrorMessage(`Maximum ${maxFiles} files allowed`);
        setUploadStatus("error");
        return;
      }

      const oversizedFiles = filesArray.filter((file) => file.size > maxFileSize)
      if (oversizedFiles.length > 0) {
        setErrorMessage(`Files too large. Max: ${(maxFileSize / (1024 * 1024)).toFixed(1)}MB`);
        setUploadStatus("error");
        return;
      }

      const filesWithMetadata = filesArray.map((file, index) => ({
        id: `${Date.now()}-${index}`,
        file: file,
        name: file.name,
        size: file.size,
      }))

      setSelectedFiles((prev) => [...prev, ...filesWithMetadata])
      setUploadStatus(null)
      setErrorMessage("")
    } catch (error) {
      setErrorMessage("Error selecting files.");
      setUploadStatus("error");
    }
  }

  const handleUpload = async () => {
    if (!selectedFiles.length) return;
    setUploading(true);
    setUploadStatus(null);

    try {
      const formData = new FormData();

      // Append each file using the key "file" to match the DTO array name
      selectedFiles.forEach(fileObj => {
        formData.append("file", fileObj.file);
      });

      // Append other fields
      formData.append("associationType", uploadType.toUpperCase());
      formData.append("ownerType", userType.toUpperCase());
      formData.append("referenceId", entityId);

      // Make the call
      const response = await uploadFileApiService(formData);

      if (response.status === 200) {
        setUploadStatus("success");
        setSelectedFiles([]);
        if (onUploadSuccess) {
          onUploadSuccess(response.data);
        }
      } else {
        throw new Error("Server returned an unsuccessful status.");
      }
    } catch (err) {
      console.error("Upload Error:", err);
      setErrorMessage(err.response?.data?.message || "Upload failed.");
      setUploadStatus("error");
    } finally {
      setUploading(false);
    }
  };

  const removeFile = (fileId) => {
    setSelectedFiles(prev => prev.filter(f => f.id !== fileId))
  }

  const formatFileSize = (bytes) => {
    if (bytes === 0) return "0 Bytes"
    const i = Math.floor(Math.log(bytes) / Math.log(1024))
    return (bytes / Math.pow(1024, i)).toFixed(2) + " " + ["Bytes", "KB", "MB", "GB"][i]
  }

  return (
    <div className="p-3 border border-2 border-dashed rounded-3 bg-white shadow-sm">
      <div className="text-center">
        <i className="bi bi-cloud-arrow-up fs-2 text-primary mb-2"></i>
        <div className="mb-2">
          <label
            htmlFor={`file-input-${entityId}`}
            className="btn btn-outline-primary btn-sm fw-bold px-3 rounded-pill cursor-pointer"
          >
            <i className="bi bi-plus-lg me-1"></i> Add Files
          </label>
          <input
            id={`file-input-${entityId}`}
            type="file"
            multiple
            accept={acceptedTypes}
            onChange={handleFileSelect}
            className="d-none"
          />
        </div>
        <p className="text-muted" style={{ fontSize: '0.7rem' }}>
          Max {maxFiles} files (Up to {(maxFileSize / (1024 * 1024)).toFixed(0)}MB each)
        </p>
      </div>

      {selectedFiles.length > 0 && (
        <div className="mt-3 border-top pt-2">
          <div className="list-group list-group-flush mb-3" style={{ maxHeight: '120px', overflowY: 'auto' }}>
            {selectedFiles.map((fileObj) => (
              <div key={fileObj.id} className="list-group-item d-flex align-items-center justify-content-between p-2 border-0 bg-light rounded mb-1">
                <div className="text-truncate me-2" style={{ fontSize: '0.8rem' }}>
                  <i className="bi bi-file-earmark me-1"></i> {fileObj.name}
                </div>
                <button onClick={() => removeFile(fileObj.id)} className="btn btn-link btn-sm text-danger p-0 border-0">
                  <i className="bi bi-trash"></i>
                </button>
              </div>
            ))}
          </div>

          <button
            onClick={handleUpload}
            disabled={uploading}
            className="btn btn-success btn-sm w-100 fw-bold shadow-sm"
          >
            {uploading ? (
              <span className="spinner-border spinner-border-sm me-2"></span>
            ) : (
              <><i className="bi bi-upload me-2"></i>Upload {selectedFiles.length} File(s)</>
            )}
          </button>
        </div>
      )}

      {uploadStatus === "success" && (
        <div className="mt-2 py-1 px-2 alert alert-success small mb-0"><i className="bi bi-check-circle me-1"></i> Uploaded!</div>
      )}

      {uploadStatus === "error" && (
        <div className="mt-2 py-1 px-2 alert alert-danger small mb-0"><i className="bi bi-exclamation-circle me-1"></i> {errorMessage}</div>
      )}
    </div>
  )
}

export default FileUpload;