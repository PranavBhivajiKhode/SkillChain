"use client"

import { useState, useEffect } from "react"

function SkillForm({ index, skill, updateSkillSet }) {
  const [skillData, setSkillData] = useState(skill)

  useEffect(() => {
    setSkillData(skill)
  }, [skill])

  function updateSkill(event) {
    const { name, value } = event.target
    const updated = { ...skillData, [name]: value }
    setSkillData(updated)
    updateSkillSet(index, updated)
  }

  return (
    <div className="card shadow-sm border-0 rounded-3 p-4 mb-4 hover-shadow-lg transition-shadow">
      <div className="d-flex align-items-center mb-3">
        <div className="bg-warning-subtle text-warning rounded-circle d-flex align-items-center justify-content-center me-3" style={{ width: "40px", height: "40px", fontSize: "1rem", fontWeight: "bold" }}>
          {index + 1}
        </div>
        <h4 className="h5 fw-semibold text-dark mb-0">Skill #{index + 1}</h4>
      </div>

      <div className="row g-3">
        <div className="col-12 col-md-6">
          <div className="mb-3">
            <label htmlFor={`skillName-${index}`} className="form-label fw-semibold">Skill Name</label>
            <input
              className="form-control rounded-pill"
              type="text"
              id={`skillName-${index}`}
              name="name"
              value={skillData.name}
              onChange={updateSkill}
              placeholder="e.g., React.js, Python, UI/UX Design"
            />
          </div>
        </div>

        <div className="col-12 col-md-6">
          <div className="mb-3">
            <label htmlFor={`proficiency-${index}`} className="form-label fw-semibold">Proficiency Level</label>
            <select
              className="form-select rounded-pill"
              id={`proficiency-${index}`}
              name="proficiency"
              value={skillData.proficiency}
              onChange={updateSkill}
            >
              <option value="">Select Proficiency</option>
              <option value="Beginner">Beginner</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Advanced">Advanced</option>
              <option value="Expert">Expert</option>
            </select>
          </div>
        </div>

        <div className="col-12">
          <div className="mb-3">
            <label htmlFor={`validationLink-${index}`} className="form-label fw-semibold">Validation Link (Optional)</label>
            <input
              className="form-control rounded-pill"
              type="url"
              id={`validationLink-${index}`}
              name="validationLink"
              value={skillData.validationLink}
              onChange={updateSkill}
              placeholder="e.g., HackerRank profile, GitHub repo"
            />
            <small className="form-text text-muted">Link to external validation or portfolio demonstrating this skill.</small>
          </div>
        </div>
      </div>
    </div>
  )
}

function Skills({ skills, updateSkillSet, addSkill }) {
  function handleAddSkill() {
    addSkill()
  }

  return (
    <div className="container py-4">
      <div className="card shadow-lg border-0 rounded-4">
        {/* Header with gradient background */}
        <div className="card-header text-white p-4 rounded-top-4" style={{ background: 'linear-gradient(to right, #ffc107, #ff9800)' }}>
          <h2 className="card-title h4 fw-bold mb-1">Skills</h2>
          <p className="card-subtitle text-white-50">List your key competencies and expertise</p>
        </div>

        <div className="card-body p-4 p-md-5 bg-light">
          {skills.length === 0 ? (
            <div className="text-center py-5">
              <div className="bg-light text-muted rounded-circle d-flex align-items-center justify-content-center mx-auto mb-4" style={{ width: "60px", height: "60px" }}>
                <svg className="bi bi-lightbulb-fill" fill="currentColor" viewBox="0 0 16 16" style={{ width: "30px", height: "30px" }}>
                  <path d="M2 2a2 2 0 012-2h8a2 2 0 012 2v12a2 2 0 01-2 2H4a2 2 0 01-2-2V2zm4 2a.5.5 0 00-.5.5v2a.5.5 0 001 0V4.5A.5.5 0 006 4zm-2 3a.5.5 0 00-.5.5v2a.5.5 0 001 0V7.5A.5.5 0 004 7zm8 0a.5.5 0 00-.5.5v2a.5.5 0 001 0V7.5A.5.5 0 0012 7z"/>
                </svg>
              </div>
              <p className="text-muted mb-4">No skills added yet. Add your first skill!</p>
            </div>
          ) : (
            <div className="row g-4">
              {skills.map((skill, index) => (
                <div key={index} className="col-12 col-lg-6">
                  <SkillForm index={index} skill={skill} updateSkillSet={updateSkillSet} />
                </div>
              ))}
            </div>
          )}

          <div className="text-center mt-4">
            <button
              className="btn btn-warning btn-lg rounded-pill shadow-sm px-4 py-2"
              onClick={handleAddSkill}
              style={{ background: 'linear-gradient(to right, #ffc107, #ff9800)', border: 'none', color: 'white' }}
            >
              <svg className="bi bi-plus me-2" fill="currentColor" viewBox="0 0 16 16" style={{ width: "20px", height: "20px" }}>
                <path d="M8 4a.5.5 0 01.5.5v3h3a.5.5 0 010 1h-3v3a.5.5 0 01-1 0v-3h-3a.5.5 0 010-1h3v-3A.5.5 0 018 4z"/>
              </svg>
              Add Skill
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Skills
