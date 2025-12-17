"use client"
import axios from "axios";
import { useState } from "react"
// Simplified icons using Bootstrap icons (bi) for consistency
// import { Upload, X, File, AlertCircle, CheckCircle } from "lucide-react"

const FileUpload = ({
  uploadType = "job",
  entityId,
  userType = "client",
  maxFiles = 10,
  maxFileSize = 10 * 1024 * 1024,
  acceptedTypes = "*/*",
}) => {
  const [selectedFiles, setSelectedFiles] = useState([])
  const [uploading, setUploading] = useState(false)
  const [uploadStatus, setUploadStatus] = useState(null) // 'success', 'error', null
  const [errorMessage, setErrorMessage] = useState("")

  const handleFileSelect = (event) => {
    try {
      const fileList = event.target.files

      if (!fileList || fileList.length === 0) {
        return
      }

      const filesArray = Array.from(fileList)

      if (filesArray.length > maxFiles) {
        setErrorMessage(`Maximum ${maxFiles} files allowed`)
        setUploadStatus("error")
        return
      }

      const oversizedFiles = filesArray.filter((file) => file.size > maxFileSize)
      if (oversizedFiles.length > 0) {
        setErrorMessage(`Files too large. Maximum size: ${(maxFileSize / (1024 * 1024)).toFixed(1)}MB per file`)
        setUploadStatus("error")
        return
      }

      const filesWithMetadata = filesArray.map((file, index) => ({
        id: `${Date.now()}-${index}`,
        file: file,
        name: file.name,
        size: file.size,
        type: file.type,
        status: "selected",
      }))

      // Append new files to existing ones (or replace if logic dictates)
      setSelectedFiles((prev) => [...prev, ...filesWithMetadata])
      setUploadStatus(null)
      setErrorMessage("")
    } catch (error) {
      console.error("Error selecting files:", error)
      setErrorMessage("Error selecting files. Please try again.")
      setUploadStatus("error")
    }
  }

  const onUpload = async (formData, uploadType) => {
    let url = "";

    if (uploadType === "job") {
      url = "http://localhost:8100/api/job/files/upload";
    } else if (uploadType === "milestone") {
      url = "http://localhost:8100/api/job/milestone/files/upload";
    }

    const response = await axios.post(url, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return response.data;
  };

  const removeFile = (fileId) => {
    const updatedFiles = selectedFiles.filter((f) => f.id !== fileId);
    setSelectedFiles(updatedFiles);
    if (updatedFiles.length === 0) {
      setUploadStatus(null);
      setErrorMessage("");
    }
  }

  const clearAllFiles = () => {
    setSelectedFiles([])
    setUploadStatus(null)
    setErrorMessage("")
    // Reset file input
    const fileInput = document.getElementById(`file-input-${uploadType}-${entityId}`)
    if (fileInput) {
      fileInput.value = ""
    }
  }

  const handleUpload = async () => {
    if (!selectedFiles.length) {
      setErrorMessage("Please select files")
      setUploadStatus("error")
      return
    }

    setUploading(true)

    try {
      const formData = new FormData()

      selectedFiles.forEach(f => {
        formData.append("files", f.file) // MUST be "files"
      })

      if (uploadType === "job") {
        formData.append("jobId", entityId)
      } else {
        formData.append("milestoneId", entityId)
      }

      formData.append("userType", userType)

      await onUpload(formData, uploadType)

      setUploadStatus("success")
      setSelectedFiles([])
    } catch (err) {
      console.error(err)
      setErrorMessage("Upload failed")
      setUploadStatus("error")
    } finally {
      setUploading(false)
    }
  }


  const formatFileSize = (bytes) => {
    if (bytes === 0) return "0 Bytes"
    const k = 1024
    const sizes = ["Bytes", "KB", "MB", "GB"]
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
  }

  return (
    <div className="p-3 border border-2 border-dashed rounded-3 bg-light">
      <div className="text-center">
        <i className="bi bi-cloud-arrow-up display-4 text-muted mb-3"></i>
        <div className="mb-3">
          <label
            htmlFor={`file-input-${uploadType}-${entityId}`}
            className="cursor-pointer d-inline-flex align-items-center px-4 py-2 border border-transparent text-sm fw-medium rounded-md text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
          >
            <i className="bi bi-file-earmark-plus me-2"></i> Select Files
          </label>
          <input
            id={`file-input-${uploadType}-${entityId}`}
            type="file"
            multiple
            accept={acceptedTypes}
            onChange={handleFileSelect}
            className="d-none"
          />
        </div>
        <p className="text-sm text-muted">
          Max {maxFiles} files, {(maxFileSize / (1024 * 1024)).toFixed(1)}MB each
        </p>
      </div>

      {selectedFiles.length > 0 && (
        <div className="mt-4 pt-3 border-top">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h4 className="text-sm fw-medium text-dark">Selected Files ({selectedFiles.length})</h4>
            <button onClick={clearAllFiles} className="btn btn-link btn-sm text-danger p-0">
              Clear All
            </button>
          </div>
          <div className="space-y-2 overflow-y-auto" style={{ maxHeight: '150px' }}>
            {selectedFiles.map((fileObj) => (
              <div key={fileObj.id} className="d-flex align-items-center justify-content-between p-2 border rounded bg-white">
                <div className="d-flex align-items-center space-x-2 flex-grow-1 min-w-0">
                  <i className="bi bi-file-earmark fs-5 text-secondary flex-shrink-0 me-2"></i>
                  <div className="flex-grow-1 min-w-0">
                    <p className="text-sm fw-medium text-dark text-truncate mb-0">{fileObj.name}</p>
                    <p className="text-xs text-muted mb-0">{formatFileSize(fileObj.size)}</p>
                  </div>
                </div>
                <button
                  onClick={() => removeFile(fileObj.id)}
                  className="btn btn-sm btn-outline-danger border-0 ms-2 flex-shrink-0"
                >
                  <i className="bi bi-x fs-5"></i>
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {selectedFiles.length > 0 && (
        <div className="mt-4">
          <button
            onClick={handleUpload}
            disabled={uploading || selectedFiles.length === 0}
            className="w-100 d-flex justify-content-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm fw-medium text-white bg-success hover:bg-success-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-success disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {uploading ? (
              <>
                <div className="spinner-border spinner-border-sm me-2" role="status"></div>
                Uploading...
              </>
            ) : (
              `Upload ${selectedFiles.length} File${selectedFiles.length > 1 ? "s" : ""}`
            )}
          </button>
        </div>
      )}

      {uploadStatus === "success" && (
        <div className="mt-4 p-3 alert alert-success d-flex align-items-center">
          <i className="bi bi-check-circle-fill me-2 fs-5"></i>
          <p className="text-sm mb-0">Files uploaded successfully!</p>
        </div>
      )}

      {uploadStatus === "error" && errorMessage && (
        <div className="mt-4 p-3 alert alert-danger d-flex align-items-center">
          <i className="bi bi-exclamation-triangle-fill me-2 fs-5"></i>
          <p className="text-sm mb-0">{errorMessage}</p>
        </div>
      )}
    </div>
  )
}

export default FileUpload