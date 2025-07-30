"use client"

import { useEffect, useState } from "react"

function ProjectDetail({ index, project, updateDetails }) {
  const [projectData, setProjectData] = useState(project)

  useEffect(() => {
    setProjectData(project)
  }, [project])

  function handleProjectData(event) {
    const { name, value, files } = event.target
    const newValue = name === "video" ? files[0] : value

    const updatedData = { ...projectData, [name]: newValue }
    setProjectData(updatedData)
    updateDetails(index, updatedData)
  }

  return (
    <div className="card shadow-sm border-0 rounded-3 p-4 mb-4 hover-shadow-lg transition-shadow">
      <div className="d-flex align-items-center mb-3">
        <div className="bg-info-subtle text-info rounded-circle d-flex align-items-center justify-content-center me-3" style={{ width: "40px", height: "40px", fontSize: "1.1rem", fontWeight: "bold" }}>
          {index + 1}
        </div>
        <h3 className="h5 fw-semibold text-dark mb-0">Project #{index + 1}</h3>
      </div>

      <div className="row g-3">
        <div className="col-12">
          <div className="mb-3">
            <label htmlFor={`projectName-${index}`} className="form-label fw-semibold">Project Name</label>
            <input
              className="form-control rounded-pill"
              name="name"
              type="text"
              id={`projectName-${index}`}
              value={projectData.name}
              onChange={handleProjectData}
              placeholder="e.g., Decentralized Voting System"
            />
          </div>
        </div>

        <div className="col-12">
          <div className="mb-3">
            <label htmlFor={`projectDescription-${index}`} className="form-label fw-semibold">Description</label>
            <textarea
              className="form-control rounded-3"
              name="description"
              rows="4"
              id={`projectDescription-${index}`}
              value={projectData.description}
              onChange={handleProjectData}
              placeholder="Briefly describe the project, your role, and technologies used."
            ></textarea>
          </div>
        </div>

        <div className="col-12 col-md-6">
          <div className="mb-3">
            <label htmlFor={`projectLink-${index}`} className="form-label fw-semibold">Project Link</label>
            <input
              className="form-control rounded-pill"
              name="link"
              type="url"
              id={`projectLink-${index}`}
              value={projectData.link}
              onChange={handleProjectData}
              placeholder="https://github.com/username/project"
            />
          </div>
        </div>

        <div className="col-12 col-md-6">
          <div className="mb-3">
            <label htmlFor={`demoVideo-${index}`} className="form-label fw-semibold">Demo Video</label>
            <input
              className="form-control rounded-pill"
              name="video"
              type="file"
              id={`demoVideo-${index}`}
              accept="video/*"
              onChange={handleProjectData}
            />
            {projectData.video && (
              <div className="mt-3 text-center">
                <video controls className="img-fluid rounded-3 shadow-sm" style={{ maxHeight: '200px' }}>
                  <source src={URL.createObjectURL(projectData.video)} type={projectData.video.type} />
                  Your browser does not support the video tag.
                </video>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProjectDetail
