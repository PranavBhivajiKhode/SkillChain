"use client"
import ProjectDetail from "./ProjectDetail.jsx"

function Projects({ projects, updateProjectDetail, addProject }) {
  function handleAddProject() {
    addProject()
  }

  return (
    <div className="container py-4">
      <div className="card shadow-lg border-0 rounded-4">
        {/* Header with gradient background */}
        <div className="card-header text-white p-4 rounded-top-4" style={{ background: 'linear-gradient(to right, #007bff, #00c6ff)' }}>
          <h2 className="card-title h4 fw-bold mb-1">Projects</h2>
          <p className="card-subtitle text-white-50">Showcase your best work</p>
        </div>

        <div className="card-body p-4 p-md-5 bg-light">
          {projects.length === 0 ? (
            <div className="text-center py-5">
              <div className="bg-light text-muted rounded-circle d-flex align-items-center justify-content-center mx-auto mb-4" style={{ width: "60px", height: "60px" }}>
                <svg className="bi bi-folder-fill" fill="currentColor" viewBox="0 0 16 16" style={{ width: "30px", height: "30px" }}>
                  <path d="M9.828 3h3.982a2 2 0 011.992 2.181L15.546 8H2.165A2.5 2.5 0 00.641 6H.5a.5.5 0 010-1H.506a2.5 2.5 0 012.483-2.336L3.5 3H5.129A2.5 2.5 0 017.5 1h2.328z"/>
                  <path d="M10.121 1.912a1 1 0 01-.377.962L14.485 8h-13A2.5 2.5 0 001 9.5V14a2 2 0 002 2h10a2 2 0 002-2V8.314l-4.485-5.373a1 1 0 01-.377-.962z"/>
                </svg>
              </div>
              <p className="text-muted mb-4">No projects yet. Add your first project!</p>
            </div>
          ) : (
            projects.map((project, index) => (
              <ProjectDetail key={index} index={index} project={project} updateDetails={updateProjectDetail} />
            ))
          )}

          <div className="text-center mt-4">
            <button
              className="btn btn-info btn-lg rounded-pill shadow-sm px-4 py-2"
              onClick={handleAddProject}
              style={{ background: 'linear-gradient(to right, #007bff, #00c6ff)', border: 'none', color: 'white' }}
            >
              <svg className="bi bi-plus me-2" fill="currentColor" viewBox="0 0 16 16" style={{ width: "20px", height: "20px" }}>
                <path d="M8 4a.5.5 0 01.5.5v3h3a.5.5 0 010 1h-3v3a.5.5 0 01-1 0v-3h-3a.5.5 0 010-1h3v-3A.5.5 0 018 4z"/>
              </svg>
              Add Project
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Projects
