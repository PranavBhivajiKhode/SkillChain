"use client"

import { useState, useEffect } from "react"

function WorkExperienceForm({ index, workExp, updateWorkExp }) {
  const [workExpData, setWorkExpData] = useState(workExp)

  useEffect(() => {
    setWorkExpData(workExp)
  }, [workExp])

  function handleWorkExpData(event) {
    const { name, value } = event.target
    const updatedData = { ...workExpData, [name]: value }
    setWorkExpData(updatedData)
    updateWorkExp(index, updatedData)
  }

  return (
    <div className="card shadow-sm border-0 rounded-3 p-4 mb-4 hover-shadow-lg transition-shadow">
      <div className="d-flex align-items-center mb-3">
        <div className="bg-purple-subtle text-purple rounded-circle d-flex align-items-center justify-content-center me-3" style={{ width: "40px", height: "40px", fontSize: "1.1rem", fontWeight: "bold", backgroundColor: 'rgba(138, 43, 226, 0.1)', color: '#8a2be2' }}>
          {index + 1}
        </div>
        <h3 className="h5 fw-semibold text-dark mb-0">Experience #{index + 1}</h3>
      </div>

      <div className="row g-3">
        <div className="col-12 col-md-6">
          <div className="mb-3">
            <label htmlFor={`jobTitle-${index}`} className="form-label fw-semibold">Job Title</label>
            <input
              className="form-control rounded-pill"
              type="text"
              id={`jobTitle-${index}`}
              name="jobTitle"
              value={workExpData.jobTitle}
              onChange={handleWorkExpData}
              placeholder="e.g., Software Engineer"
            />
          </div>
        </div>

        <div className="col-12 col-md-6">
          <div className="mb-3">
            <label htmlFor={`companyName-${index}`} className="form-label fw-semibold">Company Name</label>
            <input
              className="form-control rounded-pill"
              type="text"
              id={`companyName-${index}`}
              name="companyName"
              value={workExpData.companyName}
              onChange={handleWorkExpData}
              placeholder="e.g., Tech Solutions Inc."
            />
          </div>
        </div>

        <div className="col-12">
          <div className="mb-3">
            <label htmlFor={`address-${index}`} className="form-label fw-semibold">Address</label>
            <input
              className="form-control rounded-pill"
              type="text"
              id={`address-${index}`}
              name="address"
              value={workExpData.address}
              onChange={handleWorkExpData}
              placeholder="e.g., New York, NY"
            />
          </div>
        </div>

        <div className="col-12 col-md-6">
          <div className="mb-3">
            <label htmlFor={`startDate-${index}`} className="form-label fw-semibold">Start Date</label>
            <input
              className="form-control rounded-pill"
              type="date"
              id={`startDate-${index}`}
              name="startDate"
              value={workExpData.startDate}
              onChange={handleWorkExpData}
            />
          </div>
        </div>

        <div className="col-12 col-md-6">
          <div className="mb-3">
            <label htmlFor={`endDate-${index}`} className="form-label fw-semibold">End Date</label>
            <input
              className="form-control rounded-pill"
              type="date"
              id={`endDate-${index}`}
              name="endDate"
              value={workExpData.endDate}
              onChange={handleWorkExpData}
            />
          </div>
        </div>

        <div className="col-12">
          <div className="mb-3">
            <label htmlFor={`description-${index}`} className="form-label fw-semibold">Description</label>
            <textarea
              className="form-control rounded-3"
              id={`description-${index}`}
              rows="4"
              name="description"
              value={workExpData.description}
              onChange={handleWorkExpData}
              placeholder="Describe your responsibilities and achievements..."
            ></textarea>
          </div>
        </div>
      </div>
    </div>
  )
}

function WorkExperience({ workExperienceDetails, updateWorkExpDetail, addWorkExperience }) {
  function handleAddWorkExperience() {
    addWorkExperience()
  }

  function updateWorkExp(index, updatedData) {
    updateWorkExpDetail(index, updatedData)
  }

  return (
    <div className="container py-4">
      <div className="card shadow-lg border-0 rounded-4">
        {/* Header with gradient background */}
        <div className="card-header text-white p-4 rounded-top-4" style={{ background: 'linear-gradient(to right, #8a2be2, #da70d6)' }}>
          <h2 className="card-title h4 fw-bold mb-1">Work Experience</h2>
          <p className="card-subtitle text-white-50">Detail your professional journey</p>
        </div>

        <div className="card-body p-4 p-md-5">
          {workExperienceDetails.length === 0 ? (
            <div className="text-center py-5">
              <div className="bg-light text-muted rounded-circle d-flex align-items-center justify-content-center mx-auto mb-4" style={{ width: "60px", height: "60px" }}>
                <svg className="bi bi-briefcase-fill" fill="currentColor" viewBox="0 0 16 16" style={{ width: "30px", height: "30px" }}>
                  <path d="M6.5 1A1.5 1.5 0 005 2.5V3H1.5A1.5 1.5 0 000 4.5v1.384l7.614 2.035A1.5 1.5 0 009 7.915V4.5A1.5 1.5 0 007.5 3h-1V2.5A.5.5 0 017 2h1a.5.5 0 01.5.5V3h1.5A1.5 1.5 0 0112 4.5v1.384l.763.203a1.5 1.5 0 001.077-.138L16 5.884V4.5A1.5 1.5 0 0014.5 3H11v-.5A1.5 1.5 0 009.5 1h-3zM14 10h-2.5a.5.5 0 00-.5.5v1.5a.5.5 0 00.5.5H14a.5.5 0 00.5-.5V10.5a.5.5 0 00-.5-.5zM1.5 10h2.5a.5.5 0 01.5.5v1.5a.5.5 0 01-.5.5H1.5a.5.5 0 01-.5-.5V10.5a.5.5 0 01.5-.5zM12 13H4a1 1 0 00-1 1v1a1 1 0 001 1h8a1 1 0 001-1v-1a1 1 0 00-1-1z"/>
                </svg>
              </div>
              <p className="text-muted mb-4">No work experience entries yet. Add your first one!</p>
            </div>
          ) : (
            workExperienceDetails.map((workExp, index) => (
              <WorkExperienceForm key={index} index={index} workExp={workExp} updateWorkExp={updateWorkExp} />
            ))
          )}

          <div className="text-center mt-4">
            <button
              className="btn btn-info btn-lg rounded-pill shadow-sm px-4 py-2"
              onClick={handleAddWorkExperience}
              style={{ background: 'linear-gradient(to right, #8a2be2, #da70d6)', border: 'none' }}
            >
              <svg className="bi bi-plus me-2" fill="currentColor" viewBox="0 0 16 16" style={{ width: "20px", height: "20px" }}>
                <path d="M8 4a.5.5 0 01.5.5v3h3a.5.5 0 010 1h-3v3a.5.5 0 01-1 0v-3h-3a.5.5 0 010-1h3v-3A.5.5 0 018 4z"/>
              </svg>
              Add Work Experience
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default WorkExperience
