"use client"

import { useState } from "react"
import About from "./About.jsx"
import Education from "./Education.jsx"
import WorkExperience from "./WorkExperience.jsx"
import Projects from "./Projects.jsx"
import Skills from "./Skills.jsx"
import RatesAndAvailability from "./RateAndAvaibility.jsx"

function FreelancerProfile() {
  const [currentStep, setCurrentStep] = useState(0)

  const [profileData, setProfileData] = useState({
    about: {
      fullName: "",
      professionalHeadline: "",
      professionalSummary: "",
      profilePicture: "", // This will likely be a File object or URL after upload
      email: "",
      phone: "",
      address: "",
    },
    education: [],
    workExperience: [],
    projects: [],
    skills: [],
    ratesAndAvailability: {
      hourlyRate: "",
      rateRange: "",
      availability: "",
    },
  })

  const updateProfileSection = (section, data) => {
    setProfileData((prev) => ({
      ...prev,
      [section]: data,
    }))
  }

  const emptyEducation = {
    degreeOrSchool: "",
    institute: "",
    percentages: "", // Changed to string to allow "3.8 GPA"
    location: "",
    startDate: "",
    endDate: "",
  }

  const emptyWorkExperience = {
    jobTitle: "",
    companyName: "",
    address: "",
    startDate: "",
    endDate: "",
    description: "",
  }

  const emptyProject = {
    name: "",
    description: "",
    link: "",
    video: null, // File object
  }

  const emptySkill = {
    name: "",
    proficiency: "",
    validationLink: "",
  }

  const steps = [
    {
      name: "About You",
      component: (
        <About
          aboutData={profileData.about}
          setAboutData={(data) => updateProfileSection("about", data)}
        />
      ),
    },
    {
      name: "Education",
      component: (
        <Education
          educationDetails={profileData.education}
          updateEducationDetail={(index, data) => {
            const updatedEducation = [...profileData.education];
            updatedEducation[index] = data;
            updateProfileSection("education", updatedEducation);
          }}
          addEducation={() =>
            updateProfileSection(
              "education",
              [...profileData.education, emptyEducation]
            )
          }
        />
      ),
    },
    {
      name: "Work Experience",
      component: (
        <WorkExperience
          workExperienceDetails={profileData.workExperience}
          updateWorkExpDetail={(index, data) => {
            const updatedWorkExp = [...profileData.workExperience];
            updatedWorkExp[index] = data;
            updateProfileSection("workExperience", updatedWorkExp);
          }}
          addWorkExperience={() =>
            updateProfileSection(
              "workExperience",
              [...profileData.workExperience, emptyWorkExperience]
            )
          }
        />
      ),
    },
    {
      name: "Projects",
      component: (
        <Projects
          projects={profileData.projects}
          updateProjectDetail={(index, data) => {
            const updatedProjects = [...profileData.projects];
            updatedProjects[index] = data;
            updateProfileSection("projects", updatedProjects);
          }}
          addProject={() =>
            updateProfileSection("projects", [...profileData.projects, emptyProject])
          }
        />
      ),
    },
    {
      name: "Skills",
      component: (
        <Skills
          skills={profileData.skills}
          updateSkillSet={(index, data) => {
            const updatedSkills = [...profileData.skills];
            updatedSkills[index] = data;
            updateProfileSection("skills", updatedSkills);
          }}
          addSkill={() =>
            updateProfileSection("skills", [...profileData.skills, emptySkill])
          }
        />
      ),
    },
    {
      name: "Rates & Availability",
      component: (
        <RatesAndAvailability
          ratesAndAvailabilityDetails={profileData.ratesAndAvailability}
          updateRatesAndAvailability={(data) =>
            updateProfileSection("ratesAndAvailability", data)
          }
        />
      ),
    },
  ]

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleSubmit = () => {
    // In a real application, you would send profileData to your backend here
    console.log("Submitting Profile Data:", profileData)
    alert("Profile submitted successfully! (Simulated)") // Replace with a proper modal/notification
    // You might redirect the user or show a success page
  }

  return (
    <>
      {/* Bootstrap CSS CDN */}
      <link
        href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css"
        rel="stylesheet"
        xintegrity="sha384-9ndCyUaIbzAi2FUVXJi0CjmCapSmO7SnpJef0486qhLnuZ2cdeRhO02iuK6FUUVM"
        crossOrigin="anonymous"
      />
      {/* Bootstrap JS CDN (Bundle with Popper) */}
      <script
        src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"
        xintegrity="sha384-geWF76RCwLtnZ8qwWowPQNguL3RmwHVBC9FhGdlKrxdiJJigb/j/68SIy3Te4Bkz"
        crossOrigin="anonymous"
      ></script>
      {/* Google Fonts for Inter */}
      <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />

      {/* Custom Global Styles for consistency and appeal */}
      <style>
        {`
        body {
          font-family: 'Inter', sans-serif;
          background-color: #f8f9fa; /* Light background */
        }
        .min-vh-100 {
          min-height: 100vh;
        }
        .card {
          border: none;
        }
        .rounded-4 {
          border-radius: 1.5rem !important; /* Larger border-radius for softer look */
        }
        .rounded-pill {
            border-radius: 50rem !important; /* Pill shape for inputs and buttons */
        }
        .form-control, .form-select, .input-group-text {
            border-radius: 0.5rem !important; /* Slightly rounded for form elements */
            border-color: #dee2e6;
        }
        .form-control:focus, .form-select:focus {
            border-color: #6a0dad; /* Focus color */
            box-shadow: 0 0 0 0.25rem rgba(106, 13, 173, 0.25);
        }
        .btn-primary {
            background-color: #6a0dad; /* Deeper purple */
            border-color: #6a0dad;
            transition: all 0.3s ease;
        }
        .btn-primary:hover {
            background-color: #7b1fa2; /* Lighter purple on hover */
            border-color: #7b1fa2;
            transform: translateY(-2px); /* Slight lift effect */
            box-shadow: 0 4px 8px rgba(0,0,0,0.2);
        }
        .btn-success {
            background-color: #28a745;
            border-color: #28a745;
            transition: all 0.3s ease;
        }
        .btn-success:hover {
            background-color: #218838;
            border-color: #1e7e34;
            transform: translateY(-2px);
            box-shadow: 0 4px 8px rgba(0,0,0,0.2);
        }
        .btn-info { /* Used for Work Experience and Projects Add buttons */
            background-color: #17a2b8;
            border-color: #17a2b8;
            transition: all 0.3s ease;
            color: white;
        }
        .btn-info:hover {
            background-color: #138496;
            border-color: #117a8b;
            transform: translateY(-2px);
            box-shadow: 0 4px 8px rgba(0,0,0,0.2);
        }
        .btn-warning { /* Used for Skills Add button */
            background-color: #ffc107;
            border-color: #ffc107;
            transition: all 0.3s ease;
            color: white;
        }
        .btn-warning:hover {
            background-color: #e0a800;
            border-color: #cc9900;
            transform: translateY(-2px);
            box-shadow: 0 4px 8px rgba(0,0,0,0.2);
        }
        .btn-outline-secondary {
            border-color: #ced4da;
            color: #6c757d;
        }
        .btn-outline-secondary:hover {
            background-color: #e9ecef;
            color: #495057;
        }
        .text-primary {
            color: #6a0dad !important;
        }
        .bg-primary-subtle {
            background-color: rgba(106, 13, 173, 0.1) !important;
        }
        .bg-success-subtle {
            background-color: rgba(40, 167, 69, 0.1) !important;
        }
        .bg-purple-subtle {
            background-color: rgba(138, 43, 226, 0.1) !important; /* Custom purple for Work Exp */
        }
        .bg-info-subtle {
            background-color: rgba(23, 162, 184, 0.1) !important; /* Custom info blue for Projects */
        }
        .bg-warning-subtle {
            background-color: rgba(255, 193, 7, 0.1) !important; /* Custom warning yellow for Skills */
        }
        .hover-shadow-lg:hover {
            box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15) !important;
        }
        .transition-shadow {
            transition: box-shadow 0.3s ease-in-out;
        }
        .progress-bar-custom {
            background: linear-gradient(to right, #6a0dad, #8e2de2);
            transition: width 0.5s ease-in-out;
        }
        `}
      </style>

      <div className="container py-5">
        <div className="card shadow-lg border-0 rounded-4">
          <div className="card-header bg-white p-4 rounded-top-4 border-bottom-0">
            <h1 className="text-center text-dark fw-bold mb-2">Create Your Freelancer Profile</h1>
            <p className="text-center text-muted mb-4">Step {currentStep + 1} of {steps.length}: {steps[currentStep].name}</p>

            {/* Progress Bar */}
            <div className="progress rounded-pill" style={{ height: '10px' }}>
              <div
                className="progress-bar progress-bar-custom"
                role="progressbar"
                style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
                aria-valuenow={((currentStep + 1) / steps.length) * 100}
                aria-valuemin="0"
                aria-valuemax="100"
              ></div>
            </div>
          </div>

          <div className="card-body p-0">
            {steps[currentStep].component}
          </div>

          <div className="card-footer bg-white d-flex justify-content-between align-items-center p-4 rounded-bottom-4 border-top-0">
            <button
              className="btn btn-outline-secondary rounded-pill px-4 py-2"
              onClick={handleBack}
              disabled={currentStep === 0}
            >
              <svg className="bi bi-arrow-left me-2" fill="currentColor" viewBox="0 0 16 16" style={{ width: "20px", height: "20px" }}>
                <path fillRule="evenodd" d="M11.354 1.646a.5.5 0 010 .708L5.707 8l5.647 5.646a.5.5 0 01-.708.708l-6-6a.5.5 0 010-.708l6-6a.5.5 0 01.708 0z"/>
              </svg>
              Back
            </button>

            {currentStep === steps.length - 1 ? (
              <button
                className="btn btn-success btn-lg rounded-pill shadow-sm px-4 py-2"
                onClick={handleSubmit}
              >
                <svg className="bi bi-check-lg me-2" fill="currentColor" viewBox="0 0 16 16" style={{ width: "20px", height: "20px" }}>
                  <path d="M13.485 1.431a1.473 1.473 0 01.21 1.637l-6.85 9.07a1.473 1.473 0 01-2.228.01L.52 7.037a1.473 1.473 0 012.086-2.086L6 9.035l5.59-7.41a1.473 1.473 0 011.895-.184z"/>
                </svg>
                Submit Profile
              </button>
            ) : (
              <button
                className="btn btn-primary btn-lg rounded-pill shadow-sm px-4 py-2"
                onClick={handleNext}
              >
                Next
                <svg className="bi bi-arrow-right ms-2" fill="currentColor" viewBox="0 0 16 16" style={{ width: "20px", height: "20px" }}>
                  <path fillRule="evenodd" d="M4.646 1.646a.5.5 0 01.708 0l6 6a.5.5 0 010 .708l-6 6a.5.5 0 01-.708-.708L10.293 8 4.646 2.354a.5.5 0 010-.708z"/>
                </svg>
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  )
}

export default FreelancerProfile
