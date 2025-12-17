"use client"

import { useState, useEffect } from "react"

function About({ aboutData, setAboutData }) {
  const [about, setAbout] = useState(aboutData)

  useEffect(() => {
    setAbout(aboutData)
  }, [aboutData])

  function handleAboutChange(event) {
    const { name, value, files } = event.target
    let newValue = value

    if (name === "profilePicture" && files && files.length > 0) {
      newValue = files[0]
    }

    const updatedAbout = { ...about, [name]: newValue }
    setAbout(updatedAbout)
    setAboutData(updatedAbout)
  }

  return (
    <div className="container py-4">
      <div className="card shadow-lg border-0 rounded-4 overflow-hidden">
        {/* Header with gradient background */}
        <div className="card-header text-white p-4 rounded-top-4" style={{ background: 'linear-gradient(to right, #4a00e0, #8e2de2)' }}>
          <h2 className="card-title h4 fw-bold mb-1">Personal Information</h2>
          <p className="card-subtitle text-white-50">Tell us about yourself</p>
        </div>

        <div className="card-body p-4 p-md-5">
          <div className="row g-4 mb-4">
            <div className="col-12 col-md-6">
              <div className="mb-3">
                <label htmlFor="fullName" className="form-label fw-semibold">Full Name</label>
                <input
                  className="form-control rounded-pill"
                  type="text"
                  id="fullName"
                  value={about.fullName}
                  name="fullName"
                  onChange={handleAboutChange}
                  placeholder="John Doe"
                />
              </div>
            </div>

            <div className="col-12 col-md-6">
              <div className="mb-3">
                <label htmlFor="professionalHeadline" className="form-label fw-semibold">Professional Headline</label>
                <input
                  className="form-control rounded-pill"
                  type="text"
                  id="professionalHeadline"
                  value={about.professionalHeadline}
                  name="professionalHeadline"
                  onChange={handleAboutChange}
                  placeholder="e.g., Senior Full-Stack Developer"
                />
              </div>
            </div>
          </div>

          <div className="mb-4">
            <label htmlFor="professionalSummary" className="form-label fw-semibold">Professional Summary</label>
            <textarea
              className="form-control rounded-3"
              id="professionalSummary"
              rows="4"
              value={about.professionalSummary}
              name="professionalSummary"
              onChange={handleAboutChange}
              placeholder="A brief overview of your skills and experience..."
            ></textarea>
          </div>

          <div className="row g-4 mb-4">
            <div className="col-12 col-md-6">
              <div className="mb-3">
                <label htmlFor="email" className="form-label fw-semibold">Email</label>
                <input
                  className="form-control rounded-pill"
                  type="email"
                  id="email"
                  value={about.email}
                  name="email"
                  onChange={handleAboutChange}
                  placeholder="your.email@example.com"
                />
              </div>
            </div>
            <div className="col-12 col-md-6">
              <div className="mb-3">
                <label htmlFor="profilePicture" className="form-label fw-semibold">Profile Picture</label>
                <input
                  className="form-control rounded-pill"
                  type="file"
                  id="profilePicture"
                  accept="image/*"
                  name="profilePicture"
                  onChange={handleAboutChange}
                />
              </div>
            </div>
          </div>

          <div className="row g-4">
            <div className="col-12 col-md-6">
              <div className="mb-3">
                <label htmlFor="phone" className="form-label fw-semibold">Phone</label>
                <input
                  className="form-control rounded-pill"
                  type="tel"
                  id="phone"
                  value={about.phone}
                  name="phone"
                  onChange={handleAboutChange}
                  placeholder="+1 (555) 123-4567"
                />
              </div>
            </div>

            <div className="col-12 col-md-6">
              <div className="mb-3">
                <label htmlFor="address" className="form-label fw-semibold">Address</label>
                <input
                  className="form-control rounded-pill"
                  type="text"
                  id="address"
                  value={about.address}
                  name="address"
                  onChange={handleAboutChange}
                  placeholder="City, Country"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default About
