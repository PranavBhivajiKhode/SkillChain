"use client"

import { useState } from "react"
// *** API Placeholder: Import API calls for profile CRUD operations ***
// import { fetchFreelancerProfile, updateFreelancerProfile } from "../Api/FreelancerApiService" 

export default function FreelancerProfile() {
  const [isEditing, setIsEditing] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  
  // Assuming this data structure is fetched from a profile API
  const [profileData, setProfileData] = useState({
    name: "John Doe",
    title: "Full Stack Developer",
    email: "john.doe@email.com",
    phone: "+1 (555) 123-4567",
    location: "San Francisco, CA",
    hourlyRate: 75,
    bio: "Experienced full-stack developer with 5+ years of expertise in React, Node.js, and modern web technologies. I specialize in building scalable, clean, and performant web applications.",
    skills: ["React.js", "Node.js", "TypeScript", "MongoDB", "Python", "AWS", "Docker"],
    stats: {
      totalProjects: 24,
      successRate: 96,
      averageRating: 4.8,
      totalEarnings: 45000,
    },
  })

  const [newSkill, setNewSkill] = useState("")

  const addSkill = () => {
    if (newSkill.trim() && !profileData.skills.includes(newSkill.trim())) {
      setProfileData((prev) => ({
        ...prev,
        skills: [...prev.skills, newSkill.trim()],
      }))
      setNewSkill("")
    }
  }

  const removeSkill = (skillToRemove) => {
    setProfileData((prev) => ({
      ...prev,
      skills: prev.skills.filter((skill) => skill !== skillToRemove),
    }))
  }

  const handleSave = async () => {
    // *** API Call Placeholder: Update freelancer profile ***
    // const authContext = useAuth();
    // try {
    //     setIsSaving(true);
    //     const response = await updateFreelancerProfile(authContext.userID, profileData);
    //     if (response.status === 200) {
    //         alert("Profile updated successfully!");
    //         setIsEditing(false);
    //     }
    // } catch (error) {
    //     console.error("Failed to save profile:", error);
    //     alert("Failed to save profile.");
    // } finally {
    //     setIsSaving(false);
    // }
    
    console.log("Saving profile (Simulated):", profileData)
    setIsEditing(false)
  }

  return (
    <div className="container-fluid p-0">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h3 className="h3 mb-0 text-dark"><i className="bi bi-person me-2 text-warning"></i> Freelancer Profile</h3>
        <button 
            className={`btn ${isEditing ? "btn-outline-secondary" : "btn-warning text-dark"} btn-sm shadow-sm`} 
            onClick={() => setIsEditing(!isEditing)}
        >
          <i className={`bi ${isEditing ? "bi-x" : "bi-pencil"} me-1`}></i>
          {isEditing ? "Cancel Edit" : "Edit Profile"}
        </button>
      </div>

      <div className="row">
        {/* Profile Details Card */}
        <div className="col-md-8">
          <div className="card shadow-lg border-0">
            <div className="card-header bg-dark text-white">
              <h5 className="mb-0">Personal & Professional Information</h5>
            </div>
            <div className="card-body">
              <div className="row">
                <div className="col-md-3 text-center border-end mb-4 mb-md-0">
                  <div
                    className="bg-warning text-dark rounded-circle d-flex align-items-center justify-content-center mx-auto mb-3"
                    style={{ width: "90px", height: "90px" }}
                  >
                    <span className="fw-bold fs-3">
                      {profileData.name.split(" ").map((n) => n[0]).join("")}
                    </span>
                  </div>
                  <h5 className="mb-0 text-dark">{profileData.name}</h5>
                  <p className="small text-muted mb-0">{profileData.title}</p>
                  <p className="small text-muted"><i className="bi bi-geo-alt me-1"></i> {profileData.location}</p>
                </div>
                
                <div className="col-md-9">
                    <h6 className="border-bottom pb-2 mb-3 text-primary"><i className="bi bi-info-circle me-1"></i> Contact & Rate</h6>
                  <div className="row">
                    <InputField label="Full Name" name="name" value={profileData.name} isEditing={isEditing} onChange={setProfileData} />
                    <InputField label="Professional Title" name="title" value={profileData.title} isEditing={isEditing} onChange={setProfileData} />
                    <InputField label="Email" name="email" value={profileData.email} isEditing={isEditing} onChange={setProfileData} type="email" />
                    <InputField label="Phone" name="phone" value={profileData.phone} isEditing={isEditing} onChange={setProfileData} type="tel" />
                    <InputField label="Location" name="location" value={profileData.location} isEditing={isEditing} onChange={setProfileData} />
                    
                    <div className="col-md-6 mb-3">
                        <label className="form-label fw-semibold small text-muted">Hourly Rate ($)</label>
                        <input
                            type="number"
                            className="form-control"
                            value={profileData.hourlyRate}
                            disabled={!isEditing}
                            onChange={(e) =>
                            setProfileData((prev) => ({ ...prev, hourlyRate: Number.parseInt(e.target.value) }))
                            }
                        />
                    </div>
                    
                    <div className="col-12 mb-3">
                      <label className="form-label fw-semibold small text-muted">Bio</label>
                      <textarea
                        className="form-control"
                        rows="3"
                        value={profileData.bio}
                        disabled={!isEditing}
                        onChange={(e) => setProfileData((prev) => ({ ...prev, bio: e.target.value }))}
                      />
                    </div>
                  </div>
                  
                  {/* Skills Section */}
                  <h6 className="border-bottom pb-2 mb-3 text-primary"><i className="bi bi-tools me-1"></i> Skills</h6>
                  <div className="mb-3">
                    {isEditing && (
                      <div className="input-group mb-2">
                        <input
                          type="text"
                          className="form-control"
                          value={newSkill}
                          onChange={(e) => setNewSkill(e.target.value)}
                          placeholder="Add a new skill"
                          onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addSkill())}
                        />
                        <button type="button" className="btn btn-outline-primary" onClick={addSkill}>
                          Add
                        </button>
                      </div>
                    )}
                    <div className="d-flex flex-wrap gap-2">
                      {profileData.skills.map((skill, index) => (
                        <span key={index} className="badge bg-primary rounded-pill d-flex align-items-center py-2 px-3 fw-normal">
                          {skill}
                          {isEditing && (
                            <button
                              type="button"
                              className="btn-close btn-close-white ms-2"
                              onClick={() => removeSkill(skill)}
                              style={{ fontSize: "0.7em" }}
                            ></button>
                          )}
                        </span>
                      ))}
                    </div>
                  </div>

                  {isEditing && (
                    <div className="mt-3 pt-3 border-top d-flex gap-2">
                      <button className="btn btn-success" onClick={handleSave} disabled={isSaving}>
                        {isSaving ? "Saving..." : "Save Changes"}
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Sidebar Card */}
        <div className="col-md-4">
          <div className="card shadow-lg border-0 sticky-top" style={{ top: '15px' }}>
            <div className="card-header bg-light text-dark">
              <h5 className="mb-0"><i className="bi bi-bar-chart me-1"></i> Performance Stats</h5>
            </div>
            <div className="card-body d-grid gap-3">
              <StatItem title="Total Earnings" value={`$${profileData.stats.totalEarnings.toLocaleString()}`} icon="bi-currency-dollar" color="success" />
              <StatItem title="Success Rate" value={`${profileData.stats.successRate}%`} icon="bi-graph-up" color="primary" />
              <StatItem title="Average Rating" value={`${profileData.stats.averageRating}/5`} icon="bi-star-fill" color="warning" />
              <StatItem title="Completed Projects" value={profileData.stats.totalProjects} icon="bi-briefcase-fill" color="info" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// Helper components reused from ClientProfile
const InputField = ({ label, name, value, isEditing, onChange, type = "text" }) => (
    <div className="col-md-6 mb-3">
      <label className="form-label fw-semibold small text-muted">{label}</label>
      <input
        type={type}
        className="form-control"
        value={value}
        disabled={!isEditing}
        onChange={(e) => onChange(prev => ({ ...prev, [name]: e.target.value }))}
      />
    </div>
);

const StatItem = ({ title, value, icon, color }) => (
    <div className="p-3 border rounded d-flex align-items-center bg-light-subtle">
        <div className={`me-3 text-${color} fs-4`}>
            <i className={`bi ${icon}`}></i>
        </div>
        <div>
            <div className="fw-bold fs-5 text-dark">{value}</div>
            <small className="text-muted">{title}</small>
        </div>
    </div>
);