"use client"

const MilestoneManager = ({ milestones, onMilestonesChange, errors = {} }) => {
  const currencies = ["USD", "EUR", "GBP", "CAD", "AUD"]

  const handleMilestoneChange = (index, field, value) => {
    const updatedMilestones = milestones.map((milestone, i) =>
      i === index ? { ...milestone, [field]: value } : milestone,
    )
    onMilestonesChange(updatedMilestones)
  }

  const handleAddMilestone = () => {
    const newMilestone = {
      title: "",
      description: "",
      budgetAmount: "",
      budgetCurrency: "USD",
      deadlineDate: "",
      orderIndex: milestones.length + 1, // Use orderIndex for consistency with job details view
    }
    onMilestonesChange([...milestones, newMilestone])
  }

  const handleRemoveMilestone = (indexToRemove) => {
    // Also remove any related errors when removing a milestone
    const updatedMilestones = milestones
      .filter((_, index) => index !== indexToRemove)
      .map((milestone, index) => ({ ...milestone, orderIndex: index + 1 }))
    onMilestonesChange(updatedMilestones)
  }

  const handleMoveMilestone = (index, direction) => {
    const newIndex = direction === "up" ? index - 1 : index + 1
    if (newIndex < 0 || newIndex >= milestones.length) return

    const newMilestones = [...milestones]
    const temp = newMilestones[index]
    newMilestones[index] = newMilestones[newIndex]
    newMilestones[newIndex] = temp

    // Update order numbers
    const updatedMilestones = newMilestones.map((milestone, i) => ({
      ...milestone,
      orderIndex: i + 1,
    }))
    onMilestonesChange(updatedMilestones)
  }

  return (
    <div className="mb-4 p-4 border rounded bg-light">
      <div className="d-flex justify-content-between align-items-center mb-3 border-bottom pb-3">
        <label className="form-label mb-0 fs-5 fw-bold text-primary">
          <i className="bi bi-flag-fill me-2"></i>
          Project Milestones
        </label>
        {milestones.length > 0 && (
          <button type="button" className="btn btn-success btn-sm shadow-sm" onClick={handleAddMilestone}>
            <i className="bi bi-plus-circle me-1"></i>
            Add Milestone
          </button>
        )}
      </div>

      {milestones.length === 0 && (
        <div className="text-center py-5 border border-2 border-dashed rounded-3 bg-white">
          <div className="mb-3">
            <i className="bi bi-flag display-4 text-muted"></i>
          </div>
          <h5 className="text-muted mb-3">No Milestones Added Yet</h5>
          <p className="text-muted mb-4">
            Break down your project into manageable phases with specific deliverables, budgets, and deadlines.
          </p>
          <button type="button" className="btn btn-primary btn-lg shadow-sm" onClick={handleAddMilestone}>
            <i className="bi bi-plus-circle me-2"></i>
            Add Your First Milestone
          </button>
        </div>
      )}

      <div className="d-grid gap-3">
        {milestones.map((milestone, index) => (
          <div key={index} className="card shadow-sm border-start border-primary border-4">
            <div className="card-header bg-white d-flex justify-content-between align-items-center py-2">
              <div className="d-flex align-items-center">
                <div className="badge bg-primary rounded-pill me-3 px-3 py-2 fw-bold fs-6">#{milestone.orderIndex}</div>
                <h6 className="mb-0 fw-bold text-dark">
                  <i className="bi bi-flag me-2 text-primary"></i>
                  Milestone {milestone.orderIndex}
                  {milestone.title && ` - ${milestone.title.substring(0, 30)}${milestone.title.length > 30 ? "..." : ""}`}
                </h6>
              </div>
              <div className="btn-group btn-group-sm">
                <button
                  type="button"
                  className="btn btn-outline-secondary"
                  onClick={() => handleMoveMilestone(index, "up")}
                  disabled={index === 0}
                  title="Move Up"
                >
                  <i className="bi bi-arrow-up"></i>
                </button>
                <button
                  type="button"
                  className="btn btn-outline-secondary"
                  onClick={() => handleMoveMilestone(index, "down")}
                  disabled={index === milestones.length - 1}
                  title="Move Down"
                >
                  <i className="bi bi-arrow-down"></i>
                </button>
                <button
                  type="button"
                  className="btn btn-outline-danger"
                  onClick={() => handleRemoveMilestone(index)}
                  title="Remove Milestone"
                >
                  <i className="bi bi-trash"></i>
                </button>
              </div>
            </div>

            <div className="card-body p-4">
              {/* Milestone Title */}
              <div className="mb-3">
                <label className="form-label fw-semibold">
                  <i className="bi bi-card-text me-1"></i> Title <span className="text-danger">*</span>
                </label>
                <input
                  type="text"
                  className={`form-control ${errors[`milestone_${index}_title`] ? "is-invalid" : ""}`}
                  value={milestone.title}
                  onChange={(e) => handleMilestoneChange(index, "title", e.target.value)}
                  placeholder="Enter milestone title (e.g., 'Initial Design Mockups')"
                  maxLength="255"
                />
                {errors[`milestone_${index}_title`] && (
                  <div className="invalid-feedback">{errors[`milestone_${index}_title`]}</div>
                )}
              </div>

              {/* Milestone Description */}
              <div className="mb-3">
                <label className="form-label fw-semibold">
                  <i className="bi bi-file-text me-1"></i> Description <span className="text-danger">*</span>
                </label>
                <textarea
                  className={`form-control ${errors[`milestone_${index}_description`] ? "is-invalid" : ""}`}
                  rows="3"
                  value={milestone.description}
                  onChange={(e) => handleMilestoneChange(index, "description", e.target.value)}
                  placeholder="Describe the milestone deliverables, requirements, and success criteria"
                ></textarea>
                {errors[`milestone_${index}_description`] && (
                  <div className="invalid-feedback">{errors[`milestone_${index}_description`]}</div>
                )}
              </div>

              <div className="row">
                  {/* Milestone Budget and Currency */}
                  <div className="col-md-6">
                      <label className="form-label fw-semibold">
                          <i className="bi bi-currency-dollar me-1"></i> Budget Amount <span className="text-danger">*</span>
                      </label>
                      <div className="input-group">
                          <select
                              className="form-select"
                              value={milestone.budgetCurrency}
                              onChange={(e) => handleMilestoneChange(index, "budgetCurrency", e.target.value)}
                              style={{ flex: '0 0 auto', width: 'auto' }}
                          >
                              {currencies.map((currency) => (
                                  <option key={currency} value={currency}>
                                      {currency}
                                  </option>
                              ))}
                          </select>
                          <input
                              type="number"
                              className={`form-control ${errors[`milestone_${index}_budgetAmount`] ? "is-invalid" : ""}`}
                              value={milestone.budgetAmount}
                              onChange={(e) => handleMilestoneChange(index, "budgetAmount", e.target.value)}
                              placeholder="0.00"
                              min="0"
                              step="0.01"
                          />
                          {errors[`milestone_${index}_budgetAmount`] && (
                              <div className="invalid-feedback">{errors[`milestone_${index}_budgetAmount`]}</div>
                          )}
                      </div>
                  </div>
                  
                  {/* Milestone Deadline */}
                  <div className="col-md-6">
                      <label className="form-label fw-semibold">
                          <i className="bi bi-calendar-event me-1"></i> Deadline Date <span className="text-danger">*</span>
                      </label>
                      <input
                          type="date"
                          className={`form-control ${errors[`milestone_${index}_deadlineDate`] ? "is-invalid" : ""}`}
                          value={milestone.deadlineDate}
                          onChange={(e) => handleMilestoneChange(index, "deadlineDate", e.target.value)}
                          min={new Date().toISOString().split("T")[0]}
                      />
                      {errors[`milestone_${index}_deadlineDate`] && (
                          <div className="invalid-feedback">{errors[`milestone_${index}_deadlineDate`]}</div>
                      )}
                  </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {milestones.length > 0 && (
        <div className="alert alert-info d-flex align-items-center mt-4 shadow-sm">
          <i className="bi bi-info-circle-fill me-2 fs-5"></i>
          <div>
            <strong>
              {milestones.length} milestone{milestones.length > 1 ? "s" : ""} added
            </strong>
            {milestones.length > 0 && (
              <span className="ms-2 fw-semibold">
                • Total milestone budget:{" "}
                {milestones.reduce((sum, m) => sum + (Number.parseFloat(m.budgetAmount) || 0), 0).toFixed(2)}{" "}
                {milestones[0]?.budgetCurrency || "USD"}
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default MilestoneManager