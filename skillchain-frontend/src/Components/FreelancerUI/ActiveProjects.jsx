"use client"

import { useState } from "react"
import FreelancerActiveProjects from "./FreelancerActiveProjects"

const ActiveProjects = ({
  projects,
  // Optional callbacks to integrate with your API
  onUploadProjectFiles,
  onUploadMilestoneFiles,
  onUpdateMilestoneStatus,
  onUpdateProjectStatus,
  onPayMilestone,
  onPayRemainder,
  onSubmitForVerification,
}) => {
  const [selectedProject, setSelectedProject] = useState(null)

  const getStatusBadge = (status) => {
    switch (status) {
      case "in_progress":
        return { class: "bg-primary", text: "In Progress" }
      case "review":
        return { class: "bg-warning", text: "Under Review" }
      case "completed":
        return { class: "bg-success", text: "Completed" }
      case "on_hold":
        return { class: "bg-secondary", text: "On Hold" }
      default:
        return { class: "bg-secondary", text: "Unknown" }
    }
  }

  const getMilestoneStatus = (status) => {
    switch (status) {
      case "completed":
        return { class: "text-success", icon: "bi-check-circle-fill" }
      case "in_progress":
        return { class: "text-primary", icon: "bi-arrow-clockwise" }
      case "review":
        return { class: "text-warning", icon: "bi-eye-fill" }
      case "pending":
        return { class: "text-muted", icon: "bi-circle" }
      default:
        return { class: "text-muted", icon: "bi-circle" }
    }
  }

  const calculateDaysRemaining = (deadline) => {
    const today = new Date()
    const deadlineDate = new Date(deadline)
    const diffTime = deadlineDate - today
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return diffDays
  }

  return (
    <FreelancerActiveProjects
      projects={projects}
      onUploadProjectFiles={onUploadProjectFiles}
      onUploadMilestoneFiles={onUploadMilestoneFiles}
      onUpdateMilestoneStatus={onUpdateMilestoneStatus}
      onUpdateProjectStatus={onUpdateProjectStatus}
      onSubmitForVerification={onSubmitForVerification}
    />
  )
  
}

export default ActiveProjects
