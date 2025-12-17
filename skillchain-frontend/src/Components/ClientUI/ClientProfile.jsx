"use client"

import { useState, useEffect } from "react"
// Assuming useAuth is available for fetching userID/email
import { useAuth } from "../security/AuthContext" 
// *** API Placeholder: Import API calls for profile CRUD operations ***
// import { fetchClientProfile, updateClientProfile } from "../Api/ClientApiService" 

const ClientProfile = () => {
  const [isEditing, setIsEditing] = useState(false)
  const [loading, setLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  
  // Assuming this data structure is fetched from a profile API
  const [profileData, setProfileData] = useState({
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@email.com",
    phone: "+1 (555) 123-4567",
    company: "Tech Innovations Inc.",
    position: "CTO",
    location: "San Francisco, CA",
    bio: "Experienced technology leader with 10+ years in software development and team management.",
  })

  const [preferences, setPreferences] = useState({
    emailNotifications: true,
    projectUpdates: true,
    currency: "USD",
  })

  // Simplified stats (These should typically come from the Analytics Dashboard data source)
  const stats = {
    totalProjects: 15,
    activeProjects: 3,
    totalSpent: 45000,
    avgRating: 4.8,
  }
  
  // Simulate data fetching on load
  useEffect(() => {
    // In a real app, you'd call fetchClientProfile(authContext.userID) here
    setLoading(false); 
  }, [])


  const handleSave = async () => {
    // *** API Call Placeholder: Update client profile ***
    // const authContext = useAuth();
    // try {
    //     setIsSaving(true);
    //     const response = await updateClientProfile(authContext.userID, { ...profileData, preferences });
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

    console.log("Saving profile (Simulated):", profileData);
    setIsEditing(false);
  }
  
  if (loading) {
    return (
        <div className="text-center py-5">
          <div className="spinner-border text-primary" role="status"></div>
          <p className="mt-3 text-muted">Loading profile...</p>
        </div>
    )
  }

  return (
    <div className="container-fluid p-0">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h3 className="h3 mb-0 text-dark"><i className="bi bi-person me-2 text-primary"></i> Client Profile</h3>
        <button 
            className={`btn ${isEditing ? "btn-outline-secondary" : "btn-primary"} btn-sm shadow-sm`} 
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
              <h5 className="mb-0">Personal & Company Information</h5>
            </div>
            <div className="card-body">
              <div className="row">
                <div className="col-md-3 text-center border-end mb-4 mb-md-0">
                  <div
                    className="bg-primary rounded-circle d-flex align-items-center justify-content-center mx-auto mb-3"
                    style={{ width: "90px", height: "90px" }}
                  >
                    <span className="text-white fw-bold fs-3">
                      {profileData.firstName[0]}{profileData.lastName[0]}
                    </span>
                  </div>
                  <h5 className="mb-0 text-dark">{profileData.firstName} {profileData.lastName}</h5>
                  <p className="small text-muted mb-0">{profileData.position}</p>
                  <p className="small text-muted">{profileData.company}</p>
                </div>
                
                <div className="col-md-9">
                    <h6 className="border-bottom pb-2 mb-3 text-primary"><i className="bi bi-info-circle me-1"></i> Account Details</h6>
                  <div className="row">
                    <InputField label="First Name" name="firstName" value={profileData.firstName} isEditing={isEditing} onChange={setProfileData} />
                    <InputField label="Last Name" name="lastName" value={profileData.lastName} isEditing={isEditing} onChange={setProfileData} />
                    <InputField label="Email" name="email" value={profileData.email} isEditing={isEditing} onChange={setProfileData} type="email" />
                    <InputField label="Phone" name="phone" value={profileData.phone} isEditing={isEditing} onChange={setProfileData} type="tel" />
                    <InputField label="Company" name="company" value={profileData.company} isEditing={isEditing} onChange={setProfileData} />
                    <InputField label="Position" name="position" value={profileData.position} isEditing={isEditing} onChange={setProfileData} />
                    <InputField label="Location" name="location" value={profileData.location} isEditing={isEditing} onChange={setProfileData} />

                    <div className="col-12 mb-3">
                      <label className="form-label fw-semibold">Bio</label>
                      <textarea
                        className="form-control"
                        rows="3"
                        value={profileData.bio}
                        disabled={!isEditing}
                        onChange={(e) => setProfileData(prev => ({ ...prev, bio: e.target.value }))}
                      />
                    </div>
                  </div>
                  
                  {/* Preferences */}
                  <h6 className="border-bottom pb-2 mb-3 text-primary"><i className="bi bi-gear me-1"></i> Preferences</h6>
                  <div className="row">
                      <div className="col-md-6 mb-3">
                        <div className="form-check form-switch">
                            <input
                                className="form-check-input"
                                type="checkbox"
                                role="switch"
                                id="emailNotifications"
                                checked={preferences.emailNotifications}
                                disabled={!isEditing}
                                onChange={(e) => setPreferences(prev => ({ ...prev, emailNotifications: e.target.checked }))}
                            />
                            <label className="form-check-label" htmlFor="emailNotifications">Email Notifications</label>
                        </div>
                      </div>
                      <div className="col-md-6 mb-3">
                        <div className="form-check form-switch">
                            <input
                                className="form-check-input"
                                type="checkbox"
                                role="switch"
                                id="projectUpdates"
                                checked={preferences.projectUpdates}
                                disabled={!isEditing}
                                onChange={(e) => setPreferences(prev => ({ ...prev, projectUpdates: e.target.checked }))}
                            />
                            <label className="form-check-label" htmlFor="projectUpdates">Project Updates</label>
                        </div>
                      </div>
                      {/* Currency Preference */}
                      <div className="col-md-6 mb-3">
                            <label className="form-label small text-muted">Preferred Currency</label>
                            <select 
                                className="form-select"
                                value={preferences.currency}
                                disabled={!isEditing}
                                onChange={(e) => setPreferences(prev => ({ ...prev, currency: e.target.value }))}
                            >
                                <option value="USD">USD</option>
                                <option value="EUR">EUR</option>
                                <option value="GBP">GBP</option>
                            </select>
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
              <StatItem title="Total Projects" value={stats.totalProjects} icon="bi-briefcase-fill" color="primary" />
              <StatItem title="Active Projects" value={stats.activeProjects} icon="bi-play-circle-fill" color="warning" />
              <StatItem title="Total Spent" value={`$${stats.totalSpent.toLocaleString()}`} icon="bi-currency-dollar" color="success" />
              <StatItem title="Average Rating" value={`${stats.avgRating}/5`} icon="bi-star-fill" color="info" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ClientProfile

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