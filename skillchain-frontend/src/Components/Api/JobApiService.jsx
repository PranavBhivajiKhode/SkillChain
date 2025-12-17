import { apiClient } from "./ApiClient";

export const jobPostingApiService = (clientId, jobPostRequestDTO) =>
    apiClient.post(`/jobs/${clientId}`, jobPostRequestDTO);

export const jobRetrivalApiService = (clientId) =>
    apiClient.get(`/jobs/${clientId}`)

export const inProgressAndCompletedJobRetrievalForClient = (clientId) =>
    apiClient.get(`/jobs/status/IN_PROGRESS-and-COMPLETED/client/${clientId}`)

export const inProgressJobRetrievalForFreelancer = (freelancerId) =>
    apiClient.get(`/jobs/status/IN_PROGRESS/freelancer/${freelancerId}`)

export const initialJobRetrivalForFreelancer = () =>
    apiClient.get("/jobs/initial-retrival")

export const jobRetrivalForFreelancerUsingCustomAttributes = (requestBody) =>
    apiClient.post("/jobs/custom-filter", requestBody)

export const jobRetrivalForFreelancerUsingJobId = (jobId) =>
    apiClient.get(`/jobs/${jobId}/freelancer`)

export const UpdateJobStatusToClose = (jobId) =>
    apiClient.put(`/jobs/${jobId}/update-status/closed`)

export const uploadFilesForJob = (formData) =>
  apiClient.post("/jobs/files/upload", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

export const updateJobStatus = (jobId, status) =>
    apiClient.put("/jobs/update-status", null, 
        {
            params:{jobId, updatedStatus:status}
        }
    );


export const uploadFilesForMilestone = (formData) =>
    apiClient.get("/")
    