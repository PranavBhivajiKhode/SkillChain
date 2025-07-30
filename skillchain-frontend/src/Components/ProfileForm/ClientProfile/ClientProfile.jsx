"use client"

import { useState } from "react";

// --- Reusable Message Modal Component ---
// This component displays a modal with a title, message, and type (success/error/info).
// It's designed to be generic and reusable across the application.
const MessageModal = ({ show, title, children, onClose, type = 'info' }) => {
    if (!show) return null;

    // Determine Bootstrap classes based on message type for styling
    const modalClass = show ? 'modal fade show d-block' : 'modal fade';
    const headerBgClass = type === 'success' ? 'bg-success-subtle text-success' : type === 'error' ? 'bg-danger-subtle text-danger' : 'bg-light text-dark';
    const bodyTextClass = type === 'success' ? 'text-success' : type === 'error' ? 'text-danger' : 'text-dark';

    return (
        <div className={modalClass} tabIndex="-1" role="dialog" style={{ display: show ? 'block' : 'none' }}>
            <div className="modal-dialog modal-dialog-centered" role="document">
                <div className="modal-content rounded-4 shadow">
                    <div className={`modal-header ${headerBgClass} rounded-top-4`}>
                        <h5 className="modal-title fw-bold">{title}</h5>
                        <button type="button" className="btn-close" aria-label="Close" onClick={onClose}></button>
                    </div>
                    <div className="modal-body p-4">
                        <p className={bodyTextClass}>{children}</p>
                    </div>
                    <div className="modal-footer d-flex justify-content-center border-top-0 pt-0">
                        <button type="button" className="btn btn-primary w-100 rounded-pill" onClick={onClose}>Close</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

// --- Custom Hook for Global Message Modal ---
// This hook provides state and functions to control the MessageModal.
// It can be used by any component that needs to display a global message.
const useGlobalMessageModal = () => {
    const [show, setShow] = useState(false);
    const [content, setContent] = useState({ title: '', body: '', type: 'info' });

    // Function to display the modal with specified content and type
    const showMessage = (title, body, type = 'info') => {
        setContent({ title, body, type });
        setShow(true);
    };

    // Function to hide the modal
    const hideMessage = () => {
        setShow(false);
    };

    return { showMessage, hideMessage, show, content };
};


function ClientProfile() {
    const [profileData, setProfileData] = useState({
        companyName: "",
        companyLogo: null, // To store the File object for the logo
        companyDescription: "",
        industry: "",
        websiteOrSocialMediaLink: "",
        contactPersonName: "",
        contactEmail: "",
        contactPhone: "", // Changed to string for tel input
        location: "",
        companySize: "", // Changed to string for select/text input, or number for number input
    });

    const [isLoading, setIsLoading] = useState(false);
    // Using the global message modal for error and success
    const { showMessage, hideMessage, show, content } = useGlobalMessageModal();


    function handleProfileChange(event) {
        const { name, value, files } = event.target;
        let newValue = value;

        // Handle file input for company logo
        if (name === "companyLogo" && files && files.length > 0) {
            newValue = files[0];
        }

        setProfileData({ ...profileData, [name]: newValue });
        // Clear any active message when user starts typing again
        if (show) hideMessage();
    }

    const handleSubmit = async () => {
        // Clear previous messages before new submission attempt
        hideMessage();

        // Basic validation
        if (!profileData.companyName || !profileData.companyDescription || !profileData.industry ||
            !profileData.contactPersonName || !profileData.contactEmail || !profileData.location) {
            showMessage("Validation Error", "Please fill in all required fields.", "error");
            return;
        }

        setIsLoading(true);
        console.log("Submitting Client Profile:", profileData);

        setTimeout(() => {
            setIsLoading(false);
            showMessage("Success", "Client profile saved successfully!", "success");

        }, 1500);
    };

    return (
        <>
            <div className="d-flex justify-content-center align-items-center min-vh-100 p-3 bg-light">
                <div className="card shadow-lg border-0 rounded-4 w-00" style={{ maxWidth: '100%', maxHeight:'100%' }}>
                    {/* Card Header */}
                    <div className="card-header text-white p-4 rounded-top-4 bg-primary">
                        <h2 className="card-title h4 fw-bold mb-1">Client Profile Setup</h2>
                        <p className="card-subtitle text-white-50">Provide essential details about your company</p>
                    </div>

                    {/* Card Body - Form */}
                    <div className="card-body p-4 p-md-5">
                        {/* Display messages from the global modal state */}
                        {content.body && (
                            <div className={`alert alert-${content.type === 'success' ? 'success' : 'danger'} fade show`} role="alert">
                                {content.body}
                            </div>
                        )}

                        <div className="row g-3">
                            {/* Company Name */}
                            <div className="col-md-6">
                                <div >
                                    <label >Company Name</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="companyName"
                                        placeholder="Company Name"
                                        name="companyName"
                                        value={profileData.companyName}
                                        onChange={handleProfileChange}
                                        equired
                                    />
                                    
                                </div>
                            </div>

                            {/* Company Logo */}
                            <div className="col-md-6">
                                <div>
                                    <label htmlFor="companyLogo" className="form-label">Company Logo</label>
                                    <input
                                        type="file"
                                        className="form-control"
                                        name="companyLogo"
                                        id="companyLogo"
                                        accept="image/*"
                                        onChange={handleProfileChange}
                                    />
                                </div>
                            </div>

                            {/* Company Description */}
                            <div className="col-12">
                                <div >
                                    <label htmlFor="companyDescription">Company Description</label>
                                    <textarea
                                        className="form-control"
                                        placeholder="Company Description"
                                        id="companyDescription"
                                        name="companyDescription"
                                        style={{ height: '100px' }}
                                        value={profileData.companyDescription}
                                        onChange={handleProfileChange}
                                        required
                                    ></textarea>
                                    
                                </div>
                            </div>

                            {/* Industry */}
                            <div className="col-md-6">
                                <div>
                                    <label htmlFor="industry">Industry</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="industry"
                                        placeholder="Industry"
                                        name="industry"
                                        value={profileData.industry}
                                        onChange={handleProfileChange}
                                        required
                                    />
                                    
                                </div>
                            </div>

                            {/* Website or Social Media Link */}
                            <div className="col-md-6">
                                <div>
                                    <label htmlFor="websiteOrSocialMediaLink">Website or Social Link</label>
                                    <input
                                        type="url"
                                        className="form-control"
                                        id="websiteOrSocialMediaLink"
                                        placeholder="https://example.com"
                                        name="websiteOrSocialMediaLink"
                                        value={profileData.websiteOrSocialMediaLink}
                                        onChange={handleProfileChange}
                                    />
                                    
                                </div>
                            </div>

                            {/* Contact Person Name */}
                            <div className="col-md-6">
                                <div >
                                    <label htmlFor="contactPersonName">Contact Person</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="contactPersonName"
                                        placeholder="Contact Name"
                                        name="contactPersonName"
                                        value={profileData.contactPersonName}
                                        onChange={handleProfileChange}
                                        required
                                    />
                                    
                                </div>
                            </div>

                            {/* Contact Email */}
                            <div className="col-md-6">
                                <div >
                                    <label htmlFor="contactEmail">Contact Email</label>
                                    <input
                                        type="email"
                                        className="form-control"
                                        id="contactEmail"
                                        placeholder="email@example.com"
                                        name="contactEmail"
                                        value={profileData.contactEmail}
                                        onChange={handleProfileChange}
                                        required
                                    />
                                    
                                </div>
                            </div>

                            {/* Contact Phone */}
                            <div className="col-md-6">
                                <div >
                                    <label htmlFor="contactPhone">Phone (optional)</label>
                                    <input
                                        type="tel"
                                        className="form-control"
                                        id="contactPhone"
                                        placeholder="+1 (555) 123-4567"
                                        name="contactPhone"
                                        value={profileData.contactPhone}
                                        onChange={handleProfileChange}
                                    />
                                </div>
                            </div>

                            {/* Location */}
                            <div className="col-md-6">
                                <div >
                                    <label htmlFor="location">Location</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="location"
                                        placeholder="Location"
                                        name="location"
                                        value={profileData.location}
                                        onChange={handleProfileChange}
                                        required
                                    />
                                    
                                </div>
                            </div>

                            {/* Company Size */}
                            <div className="col-12">
                                <div >
                                    <label htmlFor="companySize">Company Size (optional)</label>
                                    <select
                                        className="form-select"
                                        id="companySize"
                                        name="companySize"
                                        value={profileData.companySize}
                                        onChange={handleProfileChange}
                                    >
                                        <option value="">Select Size</option>
                                        <option value="1-10">1–10 employees</option>
                                        <option value="11-50">11–50 employees</option>
                                        <option value="51-200">51–200 employees</option>
                                        <option value="201-500">201–500 employees</option>
                                        <option value="500+">500+ employees</option>
                                    </select>
                                    
                                </div>
                            </div>
                        </div>

                        {/* Submit Button */}
                        <div className="d-grid mt-4">
                            <button
                                type="button"
                                className="btn btn-primary btn-lg shadow-sm"
                                onClick={handleSubmit}
                                disabled={isLoading}
                            >
                                {isLoading ? (
                                    <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                                ) : (
                                    "Save Profile"
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Global Message Modal */}
            <MessageModal show={show} title={content.title} type={content.type} onClose={hideMessage}>
                {content.body}
            </MessageModal>
        </>
    );

}

export default ClientProfile;
