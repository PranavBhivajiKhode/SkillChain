"use client"

import { useState, useEffect } from "react"

function EducationForm({ index, detail, updateEducation }) {
  const [educationDetail, setEducationDetail] = useState(detail)

  useEffect(() => {
    setEducationDetail(detail)
  }, [detail])

  function handleChange(event) {
    const { name, value } = event.target
    const updatedDetail = { ...educationDetail, [name]: value }
    setEducationDetail(updatedDetail)
    updateEducation(index, updatedDetail)
  }

  return (
    <div className="card shadow-sm border-0 rounded-3 p-4 mb-4 hover-shadow-lg transition-shadow">
      <div className="d-flex align-items-center mb-3">
        <div className="bg-success-subtle text-success rounded-circle d-flex align-items-center justify-content-center me-3" style={{ width: "40px", height: "40px", fontSize: "1.1rem", fontWeight: "bold" }}>
          {index + 1}
        </div>
        <h3 className="h5 fw-semibold text-dark mb-0">Education #{index + 1}</h3>
      </div>

      <div className="row g-3">
        <div className="col-12 col-md-6">
          <div className="mb-3">
            <label htmlFor={`degreeOrSchool-${index}`} className="form-label fw-semibold">Degree/School</label>
            <input
              className="form-control rounded-pill"
              type="text"
              id={`degreeOrSchool-${index}`}
              name="degreeOrSchool"
              value={educationDetail.degreeOrSchool}
              onChange={handleChange}
              placeholder="e.g., Bachelor of Science"
            />
          </div>
        </div>

        <div className="col-12 col-md-6">
          <div className="mb-3">
            <label htmlFor={`institute-${index}`} className="form-label fw-semibold">Institute</label>
            <input
              className="form-control rounded-pill"
              type="text"
              id={`institute-${index}`}
              name="institute"
              value={educationDetail.institute}
              onChange={handleChange}
              placeholder="e.g., University of California, Berkeley"
            />
          </div>
        </div>

        <div className="col-12 col-md-6">
          <div className="mb-3">
            <label htmlFor={`percentages-${index}`} className="form-label fw-semibold">Percentages/GPA</label>
            <input
              className="form-control rounded-pill"
              type="text"
              id={`percentages-${index}`}
              name="percentages"
              value={educationDetail.percentages}
              onChange={handleChange}
              placeholder="e.g., 85% or 3.8 GPA"
            />
          </div>
        </div>

        <div className="col-12 col-md-6">
          <div className="mb-3">
            <label htmlFor={`location-${index}`} className="form-label fw-semibold">Location</label>
            <input
              className="form-control rounded-pill"
              type="text"
              id={`location-${index}`}
              name="location"
              value={educationDetail.location}
              onChange={handleChange}
              placeholder="e.g., San Francisco, CA"
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
              value={educationDetail.startDate}
              onChange={handleChange}
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
              value={educationDetail.endDate}
              onChange={handleChange}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

function Education({ educationDetails, updateEducationDetail, addEducation }) {
  function handleAddEducation() {
    addEducation()
  }

  function handleUpdateEducation(index, updatedDetail) {
    updateEducationDetail(index, updatedDetail)
  }

  return (
    <div className="container py-4">
      <div className="card shadow-lg border-0 rounded-4">
        {/* Header with gradient background */}
        <div className="card-header text-white p-4 rounded-top-4" style={{ background: 'linear-gradient(to right, #28a745, #20c997)' }}>
          <h2 className="card-title h4 fw-bold mb-1">Education</h2>
          <p className="card-subtitle text-white-50">Highlight your academic achievements</p>
        </div>

        <div className="card-body p-4 p-md-5">
          {educationDetails.length === 0 ? (
            <div className="text-center py-5">
              <div className="bg-light text-muted rounded-circle d-flex align-items-center justify-content-center mx-auto mb-4" style={{ width: "60px", height: "60px" }}>
                <svg className="bi bi-book" fill="currentColor" viewBox="0 0 16 16" style={{ width: "30px", height: "30px" }}>
                  <path d="M1 2.82v10.92c.376-.048.74-.097 1.102-.148 1.493-1.65 2.87-2.775 3.573-2.775h.5c.334 0 .654.067.954.192 1.365 1.551 2.86 2.587 3.974 2.929.406.125.77.227 1.102.324V2.82c-.376.048-.74.097-1.102.148-1.493 1.65-2.87 2.775-3.573 2.775h-.5c-.334 0-.654-.067-.954-.192C4.365 3.171 2.87 2.135 1.756 1.829A24.94 24.94 0 001 2.82zM1.5 1.186A1.5 1.5 0 000 2.5v11C0 14.32 1.01 15 2 15c.988 0 2.518-.722 3.573-2.775h.5c.665 0 1.668.232 2.734 1.378.536.572 1.066.96 1.555 1.192.14.067.276.128.407.185V2.5a1.5 1.5 0 00-1.5-1.314c-.376.048-.74.097-1.102.148-1.493 1.65-2.87 2.775-3.573 2.775h-.5c-.334 0-.654-.067-.954-.192C4.365 3.171 2.87 2.135 1.756 1.829A24.94 24.94 0 001.5 1.186z"/>
                </svg>
              </div>
              <p className="text-muted mb-4">No education entries yet. Add your first one!</p>
            </div>
          ) : (
            educationDetails.map((detail, index) => (
              <EducationForm key={index} index={index} detail={detail} updateEducation={handleUpdateEducation} />
            ))
          )}

          <div className="text-center mt-4">
            <button
              className="btn btn-success btn-lg rounded-pill shadow-sm px-4 py-2"
              onClick={handleAddEducation}
            >
              <svg className="bi bi-plus me-2" fill="currentColor" viewBox="0 0 16 16" style={{ width: "20px", height: "20px" }}>
                <path d="M8 4a.5.5 0 01.5.5v3h3a.5.5 0 010 1h-3v3a.5.5 0 01-1 0v-3h-3a.5.5 0 010-1h3v-3A.5.5 0 018 4z"/>
              </svg>
              Add Education
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Education
