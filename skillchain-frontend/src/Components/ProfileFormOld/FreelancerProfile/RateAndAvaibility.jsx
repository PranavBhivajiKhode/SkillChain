"use client"

import { useState, useEffect } from "react"

function RatesAndAvailability({ ratesAndAvailabilityDetails, updateRatesAndAvailability }) {
  const [ratesAndAvailability, setRatesAndAvailability] = useState(ratesAndAvailabilityDetails)

  useEffect(() => {
    setRatesAndAvailability(ratesAndAvailabilityDetails)
  }, [ratesAndAvailabilityDetails])

  function handleRatesAndAvailability(event) {
    const { name, value } = event.target
    const updatedData = { ...ratesAndAvailability, [name]: value }
    setRatesAndAvailability(updatedData)
    updateRatesAndAvailability(updatedData)
  }

  return (
    <div className="container py-4">
      <div className="card shadow-lg border-0 rounded-4 overflow-hidden">
        {/* Header with gradient background */}
        <div className="card-header text-white p-4 rounded-top-4" style={{ background: 'linear-gradient(to right, #20c997, #17a2b8)' }}>
          <h2 className="card-title h4 fw-bold mb-1">Rates & Availability</h2>
          <p className="card-subtitle text-white-50">Set your pricing and availability</p>
        </div>

        <div className="card-body p-4 p-md-5">
          <div className="row g-4 mb-4">
            <div className="col-12 col-md-6">
              <div className="mb-3">
                <label htmlFor="hourlyRate" className="form-label fw-semibold">Hourly Rate</label>
                <div className="input-group">
                  <span className="input-group-text rounded-start-pill">$</span>
                  <input
                    className="form-control rounded-end-pill"
                    type="number"
                    id="hourlyRate"
                    value={ratesAndAvailability.hourlyRate}
                    name="hourlyRate"
                    onChange={handleRatesAndAvailability}
                    placeholder="e.g., 50"
                    min="0"
                  />
                </div>
              </div>
            </div>

            <div className="col-12 col-md-6">
              <div className="mb-3">
                <label htmlFor="rateRange" className="form-label fw-semibold">Rate Range (Optional)</label>
                <input
                  className="form-control rounded-pill"
                  type="text"
                  id="rateRange"
                  value={ratesAndAvailability.rateRange}
                  name="rateRange"
                  onChange={handleRatesAndAvailability}
                  placeholder="e.g., $500 - $1500 per project"
                />
              </div>
            </div>
          </div>

          <div className="mb-4">
            <label htmlFor="availability" className="form-label fw-semibold">Availability</label>
            <select
              className="form-select rounded-pill"
              id="availability"
              value={ratesAndAvailability.availability}
              name="availability"
              onChange={handleRatesAndAvailability}
            >
              <option value="">Select your availability</option>
              <option value="Full-time">Full-time (40+ hours/week)</option>
              <option value="Part-time">Part-time (20-39 hours/week)</option>
              <option value="Contract">Contract basis</option>
              <option value="Weekends">Weekends only</option>
              <option value="Flexible">Flexible schedule</option>
            </select>
          </div>

          <div className="alert alert-success bg-success-subtle border-success rounded-3 p-4">
            <div className="d-flex align-items-start">
              <svg
                className="bi bi-info-circle-fill me-3"
                fill="currentColor"
                viewBox="0 0 16 16"
                style={{ width: "20px", height: "20px", marginTop: "4px" }}
              >
                <path d="M8 16A8 8 0 108 0a8 8 0 000 16zm.93-9.412l-2.822 2.821a.5.5 0 00.707.707L8 8.707l2.121 2.122a.5.5 0 00.707-.707L8.707 8l2.121-2.121a.5.5 0 00-.707-.707L8 7.293l-2.121-2.122a.5.5 0 00-.707.707L7.293 8l-2.122 2.121a.5.5 0 00.707.707L8 8.707l2.121 2.122a.5.5 0 00.707-.707L8.707 8l2.121-2.121a.5.5 0 00-.707-.707L8 7.293z"/>
              </svg>
              <div>
                <h4 className="h6 fw-bold text-success mb-1">Pricing Tips</h4>
                <p className="text-success-emphasis mb-0">
                  Research market rates for your skills and experience level. Consider your overheads and desired income.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default RatesAndAvailability
