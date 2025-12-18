import { apiClient } from "./ApiClient";

export const uploadFileApiService = (formData) =>
  apiClient.post("/jobs/files/upload", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
