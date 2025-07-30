import { useState } from "react"

export default function LoginForm() {
    const [selectedRole, setSelectedRole] = useState(null);
    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);
    const [showPassword, setShowPassword] = useState(false)

    return (
        <div className="d-flex justify-content-center align-items-center min-vh-100 bg-light">
            <div className="card shadow p-4" style={{ maxWidth: "450px", width: "100%" }}>
                <div className="text-center mb-4">
                    <h3>Login</h3>

                    <div>
                        <label className="form-label">Select Role</label>
                        <select className="form-select" value={selectedRole} onChange={(e) => setSelectedRole(e.target.value)}>
                            <option value="" disabled>Select a role</option>
                            <option value="Freelancer">Freelancer</option>
                            <option value="Client">Client</option>
                        </select>
                    </div>

                    <div>
                        <label className="form-label">Email</label>
                        <input
                            type="text"
                            className="form-control"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    <div>
                        <label className="form-lable">Password</label>
                        <div className="input-group">
                            <input
                                type="password"
                                className="form-control"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <button
                                type="button"
                                className="btn btn-outline-secondary"
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                {showPassword ? "🙈" : "👁️"}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}