const AnalyticsDashboard = ({ jobs }) => {
  const totalJobs = jobs.length;
  const activeJobs = jobs.filter(
    (job) => job.status === "ACTIVE" || job.status === "OPEN"
  ).length; // treat OPEN as active too

  const completedJobs = jobs.filter(
    (job) => job.status === "COMPLETED"
  ).length;

  const totalViews = jobs.reduce((sum, job) => sum + (job.totalViews || 0), 0);
  const totalProposals = jobs.reduce((sum, job) => sum + (job.totalProposals || 0), 0);
  const totalBudget = jobs.reduce((sum, job) => sum + (job.budgetAmount || 0), 0);

  // Mock data for Budget Overview and Activity
  const MOCK_AMOUNT_SPENT = 12500;
  const MOCK_RECENT_ACTIVITY = [
    { action: "New proposal received", job: "Full Stack Web Developer", time: "2 hours ago", type: "proposal" },
    { action: "Job viewed", job: "Mobile App UI/UX Designer", time: "4 hours ago", type: "view" },
    { action: "Message received", job: "Full Stack Web Developer", time: "1 day ago", type: "message" },
    { action: "Proposal accepted", job: "E-commerce Website", time: "2 days ago", type: "accepted" },
  ];
  
  // Mock Chart Component Placeholder
  const BudgetPieChart = ({ data }) => {
    // In a real app, this would calculate budget distribution by status/type and render a Pie or Doughnut chart.
    return (
        <div className="p-3 bg-light-subtle rounded text-center" style={{ height: '300px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <i className="bi bi-pie-chart-fill fs-2 text-primary me-2"></i>
            <span className="text-muted">Placeholder for Job Budget Distribution Chart</span>
        </div>
    )
  }

  const getActivityIcon = (type) => {
    switch (type) {
      case "proposal":
        return "bi-file-text text-warning";
      case "view":
        return "bi-eye text-info";
      case "message":
        return "bi-chat-dots text-success";
      case "accepted":
        return "bi-check-circle text-primary";
      default:
        return "bi-circle text-secondary";
    }
  };

  const formatDate = (isoString) => {
    if (!isoString) return "-";
    // Using a more standard format for tables
    return new Date(isoString).toLocaleDateString("en-US", { month: 'short', day: 'numeric' }); 
  };

  const getStatusBadgeClass = (status) => {
    switch (status) {
      case "OPEN":
      case "ACTIVE":
        return "bg-success";
      case "COMPLETED":
        return "bg-primary";
      case "CANCELLED":
        return "bg-danger";
      case "IN_PROGRESS":
        return "bg-warning text-dark";
      default:
        return "bg-secondary";
    }
  };

  return (
    <div className="container-fluid p-0">
        <h3 className="mb-4 text-dark"><i className="bi bi-graph-up me-2 text-info"></i> Client Analytics Dashboard</h3>

        {/* Stats Cards - Enhanced Styling */}
        <div className="row mb-4">
            <div className="col-lg-3 col-md-6 mb-3">
                <StatCard title="Total Jobs Posted" value={totalJobs} icon="bi-briefcase" color="dark" />
            </div>
            <div className="col-lg-3 col-md-6 mb-3">
                <StatCard title="Open/Active Jobs" value={activeJobs} icon="bi-check-circle" color="success" />
            </div>
            <div className="col-lg-3 col-md-6 mb-3">
                <StatCard title="Total Proposals" value={totalProposals} icon="bi-file-text" color="warning" />
            </div>
            <div className="col-lg-3 col-md-6 mb-3">
                <StatCard title="Completed Projects" value={completedJobs} icon="bi-award" color="primary" />
            </div>
        </div>

        <div className="row">
            {/* Budget Overview Chart/Table */}
            <div className="col-lg-7 mb-4">
                <div className="card border-0 shadow-sm">
                    <div className="card-header bg-dark text-white">
                        <h5 className="card-title mb-0"><i className="bi bi-cash-stack me-2"></i> Budget Overview</h5>
                    </div>
                    <div className="card-body">
                        {/* Chart Placeholder */}
                        <BudgetPieChart />
                        <div className="row text-center mt-3 pt-3 border-top">
                            <div className="col-md-4">
                                <h4 className="text-primary fw-bold">
                                    {jobs.length > 0 ? jobs[0].budgetCurrency : "$"} {totalBudget.toLocaleString()}
                                </h4>
                                <p className="text-muted small">Total Budget Allocated</p>
                            </div>
                            <div className="col-md-4">
                                <h4 className="text-success fw-bold">
                                    {jobs.length > 0 ? jobs[0].budgetCurrency : "$"} {MOCK_AMOUNT_SPENT.toLocaleString()}
                                </h4>
                                <p className="text-muted small">Amount Spent</p>
                            </div>
                            <div className="col-md-4">
                                <h4 className="text-warning fw-bold">
                                    {jobs.length > 0 ? jobs[0].budgetCurrency : "$"} {(totalBudget - MOCK_AMOUNT_SPENT).toLocaleString()}
                                </h4>
                                <p className="text-muted small">Remaining Budget</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Recent Activity */}
            <div className="col-lg-5 mb-4">
                <div className="card border-0 shadow-sm">
                    <div className="card-header bg-white">
                        <h5 className="card-title mb-0"><i className="bi bi-activity me-2 text-secondary"></i> Recent Activity</h5>
                    </div>
                    <div className="card-body">
                        {MOCK_RECENT_ACTIVITY.map((activity, index) => (
                        <div key={index} className="d-flex mb-3 border-bottom pb-2">
                            <div className="flex-shrink-0 me-3">
                                <i className={`bi ${getActivityIcon(activity.type)} fs-5`}></i>
                            </div>
                            <div className="flex-grow-1">
                                <div className="fw-semibold">{activity.action}</div>
                                <div className="text-muted small">{activity.job}</div>
                            </div>
                            <div className="text-end text-muted small">{activity.time}</div>
                        </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>

        {/* Job Performance Table */}
        <div className="row">
            <div className="col-12 mb-4">
                <div className="card border-0 shadow-sm">
                    <div className="card-header bg-white">
                        <h5 className="card-title mb-0"><i className="bi bi-table me-2 text-info"></i> Job Performance Summary</h5>
                    </div>
                    <div className="card-body p-0">
                        <div className="table-responsive">
                            <table className="table table-hover align-middle mb-0">
                            <thead className="table-light">
                                <tr>
                                    <th>Job Title</th>
                                    <th>Views</th>
                                    <th>Proposals</th>
                                    <th>Avg. Bid</th>
                                    <th>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {jobs.map((job) => (
                                <tr key={job.jobId}>
                                    <td>
                                    <div className="fw-semibold text-dark">{job.title}</div>
                                    <small className="text-muted">
                                        Posted {formatDate(job.createdAt)}
                                    </small>
                                    </td>
                                    <td>
                                    <span className="badge bg-info">{job.totalViews || 0}</span>
                                    </td>
                                    <td>
                                    <span className="badge bg-warning text-dark">{job.totalProposals || 0}</span>
                                    </td>
                                    <td>
                                    {job.budgetCurrency} {Math.round(job.budgetAmount * 0.95).toLocaleString()} <small className="text-muted">~</small>
                                    </td>
                                    <td>
                                    <span className={`badge ${getStatusBadgeClass(job.status)}`}>
                                        {job.status.replace('_', ' ')}
                                    </span>
                                    </td>
                                </tr>
                                ))}
                            </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  );
};

export default AnalyticsDashboard;

// Helper component for Stat Cards (reused from Freelancer UI structure)
const StatCard = ({ title, value, icon, color }) => (
    <div className={`card text-white bg-${color} shadow-lg border-0 h-100`}>
        <div className="card-body">
            <div className="d-flex justify-content-between align-items-center">
                <div>
                    <h4 className="mb-0 fw-bold text-white">{value}</h4>
                    <p className="mb-0 small">{title}</p>
                </div>
                <i className={`bi ${icon} fs-1 opacity-50`}></i>
            </div>
        </div>
    </div>
);