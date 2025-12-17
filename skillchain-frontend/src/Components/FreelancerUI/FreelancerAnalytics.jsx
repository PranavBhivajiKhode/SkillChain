"use client"

import { useState } from "react"
// Hypothetical imports for charting library
// import { Bar, Line } from 'react-chartjs-2' 

// Mock Chart Component to represent where a real chart would go
const EarningsLineChart = ({ data }) => {
    // In a real app, you'd configure chart data and options here
    const chartData = {
        labels: data.map(d => d.month),
        datasets: [{
            label: 'Earnings',
            data: data.map(d => d.amount),
            fill: true,
            backgroundColor: 'rgba(255, 193, 7, 0.2)', // warning color
            borderColor: '#ffc107',
            tension: 0.4
        }]
    }
    // return <Line data={chartData} options={{...}} />
    return (
        <div className="p-3 bg-light-subtle rounded text-center" style={{ height: '300px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <i className="bi bi-graph-up-arrow fs-2 text-warning me-2"></i>
            <span className="text-muted">Placeholder for Earnings Line Chart</span>
        </div>
    )
}

export default function FreelancerAnalytics() {
  const [timeRange, setTimeRange] = useState("30")

  // Mock analytics data (unchanged)
  const analyticsData = {
    overview: {
      totalEarnings: 15750.0,
      activeProjects: 3,
      completedProjects: 12,
      proposalSuccessRate: 68.5,
      averageRating: 4.8,
      totalHours: 324,
    },
    recentEarnings: [
      { month: "Jan", amount: 4200 },
      { month: "Feb", amount: 3800 },
      { month: "Mar", amount: 5200 },
      { month: "Apr", amount: 2550 },
    ],
    skillsPerformance: [
      { skill: "React.js", projects: 8, rating: 4.9, earnings: 8500 },
      { skill: "Node.js", projects: 6, rating: 4.7, earnings: 4200 },
      { skill: "UI/UX Design", projects: 4, rating: 4.8, earnings: 3050 },
    ],
    recentActivity: [
      { type: "project_completed", description: "Completed E-commerce Dashboard", date: "2024-01-20", amount: 2500 },
      {
        type: "proposal_accepted",
        description: "Proposal accepted for Mobile App Design",
        date: "2024-01-18",
        amount: 1800,
      },
      {
        type: "payment_received",
        description: "Payment received from TechCorp Inc.",
        date: "2024-01-15",
        amount: 3200,
      },
      {
        type: "proposal_submitted",
        description: "Submitted proposal for Data Analytics Project",
        date: "2024-01-12",
        amount: 0,
      },
    ],
  }

  const getActivityIcon = (type) => {
    const icons = {
      project_completed: { icon: "check-circle", color: "text-success" },
      proposal_accepted: { icon: "hand-thumbs-up", color: "text-primary" },
      payment_received: { icon: "currency-dollar", color: "text-success" },
      proposal_submitted: { icon: "file-earmark-plus", color: "text-info" },
    }
    return icons[type] || { icon: "circle", color: "text-muted" }
  }

  return (
    <div className="container-fluid">
      <h3 className="mb-4 text-dark"><i className="bi bi-speedometer2 me-2 text-info"></i> Freelancer Dashboard Analytics</h3>
      
      {/* Overview Cards - Enhanced Styling */}
      <div className="row mb-4">
        {/* Card 1: Total Earnings */}
        <div className="col-lg-3 col-md-6 mb-3">
          <div className="card text-white bg-dark shadow-lg border-0 h-100">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <h4 className="mb-0 text-warning">${analyticsData.overview.totalEarnings.toLocaleString()}</h4>
                  <p className="mb-0 small">Total Earnings</p>
                  <small className="opacity-75 text-success"><i className="bi bi-arrow-up me-1"></i> +12% from last month</small>
                </div>
                <i className="bi bi-currency-dollar fs-1 opacity-50"></i>
              </div>
            </div>
          </div>
        </div>
        {/* Card 2: Active Projects */}
        <div className="col-lg-3 col-md-6 mb-3">
          <div className="card text-white bg-primary shadow-lg border-0 h-100">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <h4 className="mb-0">{analyticsData.overview.activeProjects}</h4>
                  <p className="mb-0 small">Active Projects</p>
                  <small className="opacity-75">2 due this week</small>
                </div>
                <i className="bi bi-briefcase fs-1 opacity-50"></i>
              </div>
            </div>
          </div>
        </div>
        {/* Card 3: Success Rate */}
        <div className="col-lg-3 col-md-6 mb-3">
          <div className="card text-white bg-success shadow-lg border-0 h-100">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <h4 className="mb-0">{analyticsData.overview.proposalSuccessRate}%</h4>
                  <p className="mb-0 small">Success Rate</p>
                  <small className="opacity-75">Above average</small>
                </div>
                <i className="bi bi-graph-up fs-1 opacity-50"></i>
              </div>
            </div>
          </div>
        </div>
        {/* Card 4: Average Rating */}
        <div className="col-lg-3 col-md-6 mb-3">
          <div className="card text-white bg-info shadow-lg border-0 h-100">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <h4 className="mb-0">{analyticsData.overview.averageRating}</h4>
                  <p className="mb-0 small">Average Rating</p>
                  <div className="text-warning">
                    {"★".repeat(Math.floor(analyticsData.overview.averageRating))}
                    {"☆".repeat(5 - Math.floor(analyticsData.overview.averageRating))}
                  </div>
                </div>
                <i className="bi bi-star fs-1 opacity-50"></i>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="row">
        {/* Earnings Chart - Updated to use chart component */}
        <div className="col-lg-8 mb-4">
          <div className="card shadow-sm border-0">
            <div className="card-header bg-warning text-dark d-flex justify-content-between align-items-center">
              <h5 className="mb-0">
                <i className="bi bi-bar-chart me-2"></i>
                Earnings Overview
              </h5>
              <select
                className="form-select form-select-sm"
                value={timeRange}
                onChange={(e) => setTimeRange(e.target.value)}
                style={{ width: "auto" }}
              >
                <option value="7">Last 7 days</option>
                <option value="30">Last 30 days</option>
                <option value="90">Last 3 months</option>
                <option value="365">Last year</option>
              </select>
            </div>
            <div className="card-body">
                {/* Chart Component is placed here */}
                <EarningsLineChart data={analyticsData.recentEarnings} />
              
              <div className="mt-4 p-3 bg-light rounded border">
                <div className="row text-center">
                  <div className="col-4">
                    <h6 className="text-primary mb-1 fw-bold">
                      ${analyticsData.recentEarnings.reduce((sum, item) => sum + item.amount, 0).toLocaleString()}
                    </h6>
                    <small className="text-muted">Total Earnings (Period)</small>
                  </div>
                  <div className="col-4">
                    <h6 className="text-info mb-1 fw-bold">
                      $
                      {(
                        analyticsData.recentEarnings.reduce((sum, item) => sum + item.amount, 0) /
                        analyticsData.recentEarnings.length
                      ).toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
                    </h6>
                    <small className="text-muted">Average/Month</small>
                  </div>
                  <div className="col-4">
                    <h6 className="text-dark mb-1 fw-bold">{analyticsData.overview.totalHours}h</h6>
                    <small className="text-muted">Total Hours Logged</small>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Skills Performance - Improved Progress Bar Look */}
        <div className="col-lg-4 mb-4">
          <div className="card shadow-sm border-0 h-100">
            <div className="card-header bg-success text-white">
              <h5 className="mb-0">
                <i className="bi bi-award me-2"></i>
                Skills Performance
              </h5>
            </div>
            <div className="card-body">
              {analyticsData.skillsPerformance.map((skill, index) => (
                <div key={index} className="mb-3 border-bottom pb-3">
                  <div className="d-flex justify-content-between align-items-center mb-1">
                    <h6 className="mb-0">{skill.skill}</h6>
                    <span className="badge bg-warning text-dark">{skill.rating} <i className="bi bi-star-fill"></i></span>
                  </div>
                  <div className="d-flex justify-content-between small text-muted mb-1">
                    <span><i className="bi bi-briefcase me-1"></i> {skill.projects} projects</span>
                    <span className="fw-bold text-success">${skill.earnings.toLocaleString()}</span>
                  </div>
                  <div className="progress" style={{ height: "8px" }}>
                    <div className="progress-bar bg-success" role="progressbar" style={{ width: `${(skill.rating / 5) * 100}%` }} aria-valuenow={skill.rating} aria-valuemin="0" aria-valuemax="5"></div>
                  </div>
                </div>
              ))}
              <div className="mt-3 p-2 bg-info-subtle rounded text-center">
                <small className="text-info-emphasis">
                  <i className="bi bi-lightbulb me-1"></i>
                  Focus on high-performing skills for better earnings!
                </small>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity - Timeline Styling */}
      <div className="row">
        <div className="col-12">
          <div className="card shadow-sm border-0">
            <div className="card-header bg-secondary text-white">
              <h5 className="mb-0">
                <i className="bi bi-activity me-2"></i>
                Recent Activity
              </h5>
            </div>
            <div className="card-body">
              <div className="timeline">
                {analyticsData.recentActivity.map((activity, index) => {
                  const iconConfig = getActivityIcon(activity.type)
                  return (
                    <div key={index} className="d-flex mb-3 border-bottom pb-3">
                      <div className="flex-shrink-0 me-3">
                        <div className={`rounded-circle bg-light p-2 ${iconConfig.color} border border-1`} style={{ width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          <i className={`bi bi-${iconConfig.icon} fs-5`}></i>
                        </div>
                      </div>
                      <div className="flex-grow-1">
                        <div className="d-flex justify-content-between align-items-center">
                          <div>
                            <h6 className="mb-0 fw-semibold">{activity.description}</h6>
                            <small className="text-muted"><i className="bi bi-calendar me-1"></i> {activity.date}</small>
                          </div>
                          {activity.amount > 0 && (
                            <span className="badge bg-success py-2 px-3 fw-bold">+$ {activity.amount.toLocaleString()}</span>
                          )}
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
              <div className="text-center mt-3">
                <button className="btn btn-outline-primary">
                  <i className="bi bi-arrow-down me-2"></i>
                  Load More Activity
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}