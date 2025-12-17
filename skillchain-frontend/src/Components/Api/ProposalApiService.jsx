import { apiClient } from "./ApiClient";

export const proposalPostingApiService = (freelancerId, requestBody) =>
    apiClient.post(`/bids/freelancer/${freelancerId}`, requestBody);

export const fetchingAllProposalsForJob = (jobId) =>
    apiClient.get(`/bids/jobs/${jobId}`)

export const fetchAllProposalsForFreelancer = (freelancerId) =>
    apiClient.get(`/bids/freelancer/${freelancerId}`);

export const updateProposalStatusToRejected = (bidId) =>
    apiClient.put(`/bids/${bidId}/status/reject`)

export const updateProposalStatusToAccepted = (bidId) =>
    apiClient.put(`/bids/${bidId}/status/accept`)
