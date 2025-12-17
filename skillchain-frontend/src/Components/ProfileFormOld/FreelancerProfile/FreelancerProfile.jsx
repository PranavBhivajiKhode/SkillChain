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
    <div className="container py-2" style={{ maxWidth: '100%', maxHeight:'100%' }}>
      <div className="card shadow-sm" style={{ maxWidth: '100%', maxHeight:'100%' }}>
        <div className="card-header bg-primary text-white text-center" style={{ maxWidth: '100%', maxHeight:'100%' }}>
          <h2 className="mb-1">Create Your Freelancer Profile</h2>
          <p className="mb-0">
            Step {currentStep + 1} of {steps.length}: {steps[currentStep].name}
          </p>
        </div>

        {/* Progress Bar */}
        <div className="progress rounded-0" style={{ height: "6px" }}>
          <div
            className="progress-bar bg-primary"
            role="progressbar"
            style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
            aria-valuenow={((currentStep + 1) / steps.length) * 100}
            aria-valuemin="0"
            aria-valuemax="100"
          ></div>
        </div>

        {/* Step Component */}
        <div className="card-body">{steps[currentStep].component}</div>

        {/* Navigation Buttons */}
        <div className="card-footer d-flex justify-content-between">
          <button
            className="btn btn-outline-secondary"
            onClick={handleBack}
            disabled={currentStep === 0}
          >
            <i className="bi bi-arrow-left me-2"></i> Back
          </button>

          {currentStep === steps.length - 1 ? (
            <button
              className="btn btn-success"
              onClick={handleSubmit}
            >
              <i className="bi bi-check-lg me-2"></i> Submit Profile
            </button>
          ) : (
            <button
              className="btn btn-primary"
              onClick={handleNext}
            >
              Next <i className="bi bi-arrow-right ms-2"></i>
            </button>
          )}
        </div>
      </div>
    </div>
  );

}

export default FreelancerProfile
