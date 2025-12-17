"use client"

import { useState } from "react"

const MessagesCenter = () => {
  const [selectedConversation, setSelectedConversation] = useState(1)
  const [newMessage, setNewMessage] = useState("")

  const conversations = [
    {
      id: 1,
      freelancerName: "Sarah Johnson",
      freelancerAvatar: "SJ",
      projectTitle: "E-commerce Website Development",
      lastMessage: "I've completed the frontend components. Ready for your review!",
      lastMessageTime: "2 hours ago",
      unreadCount: 2,
      isOnline: true,
    },
    {
      id: 2,
      freelancerName: "Emma Davis",
      freelancerAvatar: "ED",
      projectTitle: "Mobile App UI/UX Design",
      lastMessage: "Here are the final mockups for the mobile app",
      lastMessageTime: "5 hours ago",
      unreadCount: 0,
      isOnline: false,
    },
    {
      id: 3,
      freelancerName: "Mike Chen",
      freelancerAvatar: "MC",
      projectTitle: "Data Analytics Dashboard",
      lastMessage: "Can we schedule a call to discuss the database requirements?",
      lastMessageTime: "1 day ago",
      unreadCount: 1,
      isOnline: true,
    },
  ]

  const messages = {
    1: [
      {
        id: 1,
        sender: "freelancer",
        message:
          "Hi! I've started working on your e-commerce project. I have a few questions about the product catalog structure.",
        timestamp: "2024-01-23 09:00",
        isRead: true,
      },
      {
        id: 2,
        sender: "client",
        message:
          "Great! The catalog should support categories, subcategories, and product variants. I can share the detailed requirements document.",
        timestamp: "2024-01-23 09:15",
        isRead: true,
      },
      {
        id: 3,
        sender: "freelancer",
        message:
          "Perfect! That would be very helpful. Also, do you have any specific design preferences for the product pages?",
        timestamp: "2024-01-23 09:30",
        isRead: true,
      },
      {
        id: 4,
        sender: "client",
        message:
          "I'd like a clean, modern design similar to what we see on major e-commerce sites. Focus on user experience and mobile responsiveness.",
        timestamp: "2024-01-23 10:00",
        isRead: true,
      },
      {
        id: 5,
        sender: "freelancer",
        message: "I've completed the frontend components. Ready for your review!",
        timestamp: "2024-01-23 14:00",
        isRead: false,
      },
      {
        id: 6,
        sender: "freelancer",
        message:
          "I've also set up the basic routing and state management. The demo is available at the staging URL I shared earlier.",
        timestamp: "2024-01-23 14:05",
        isRead: false,
      },
    ],
    2: [
      {
        id: 1,
        sender: "freelancer",
        message: "Hello! I'm excited to work on your mobile app design project.",
        timestamp: "2024-01-22 10:00",
        isRead: true,
      },
      {
        id: 2,
        sender: "client",
        message: "Welcome aboard! I'm looking forward to seeing your creative ideas.",
        timestamp: "2024-01-22 10:30",
        isRead: true,
      },
      {
        id: 3,
        sender: "freelancer",
        message: "Here are the final mockups for the mobile app",
        timestamp: "2024-01-22 16:00",
        isRead: true,
      },
    ],
    3: [
      {
        id: 1,
        sender: "freelancer",
        message: "Hi! I've reviewed your analytics dashboard requirements.",
        timestamp: "2024-01-21 11:00",
        isRead: true,
      },
      {
        id: 2,
        sender: "freelancer",
        message: "Can we schedule a call to discuss the database requirements?",
        timestamp: "2024-01-22 09:00",
        isRead: false,
      },
    ],
  }

  const selectedConversationData = conversations.find((c) => c.id === selectedConversation)
  const conversationMessages = messages[selectedConversation] || []

  const handleSendMessage = (e) => {
    e.preventDefault()
    if (newMessage.trim()) {
      console.log("Sending message:", newMessage)
      setNewMessage("")
    }
  }

  return(
    <div>
      Message System
    </div>
  )
  // return (
  //   <div>
  //     <div className="d-flex justify-content-between align-items-center mb-4">
  //       <h2 className="h3 mb-0">Messages Center</h2>
  //       <button className="btn btn-primary btn-sm">
  //         <i className="bi bi-plus-circle me-1"></i>New Message
  //       </button>
  //     </div>

  //     <div className="row" style={{ height: "600px" }}>
  //       {/* Conversations List */}
  //       <div className="col-md-4">
  //         <div className="card border-0 shadow-sm h-100">
  //           <div className="card-header bg-white">
  //             <h6 className="card-title mb-0">Conversations</h6>
  //           </div>
  //           <div className="card-body p-0" style={{ overflowY: "auto" }}>
  //             {conversations.map((conversation) => (
  //               <div
  //                 key={conversation.id}
  //                 className={`p-3 border-bottom cursor-pointer ${selectedConversation === conversation.id ? "bg-light" : ""}`}
  //                 onClick={() => setSelectedConversation(conversation.id)}
  //                 style={{ cursor: "pointer" }}
  //               >
  //                 <div className="d-flex align-items-start">
  //                   <div className="position-relative me-3">
  //                     <div
  //                       className="bg-primary rounded-circle d-flex align-items-center justify-content-center"
  //                       style={{ width: "40px", height: "40px" }}
  //                     >
  //                       <span className="text-white fw-bold small">{conversation.freelancerAvatar}</span>
  //                     </div>
  //                     {conversation.isOnline && (
  //                       <span
  //                         className="position-absolute bottom-0 end-0 bg-success rounded-circle border border-white"
  //                         style={{ width: "12px", height: "12px" }}
  //                       ></span>
  //                     )}
  //                   </div>
  //                   <div className="flex-grow-1 min-width-0">
  //                     <div className="d-flex justify-content-between align-items-start mb-1">
  //                       <h6 className="mb-0 text-truncate">{conversation.freelancerName}</h6>
  //                       {conversation.unreadCount > 0 && (
  //                         <span className="badge bg-primary rounded-pill">{conversation.unreadCount}</span>
  //                       )}
  //                     </div>
  //                     <p className="text-muted small mb-1 text-truncate">{conversation.projectTitle}</p>
  //                     <p className="text-muted small mb-0 text-truncate">{conversation.lastMessage}</p>
  //                     <small className="text-muted">{conversation.lastMessageTime}</small>
  //                   </div>
  //                 </div>
  //               </div>
  //             ))}
  //           </div>
  //         </div>
  //       </div>

  //       {/* Chat Area */}
  //       <div className="col-md-8">
  //         <div className="card border-0 shadow-sm h-100 d-flex flex-column">
  //           {/* Chat Header */}
  //           <div className="card-header bg-white">
  //             <div className="d-flex align-items-center">
  //               <div className="position-relative me-3">
  //                 <div
  //                   className="bg-primary rounded-circle d-flex align-items-center justify-content-center"
  //                   style={{ width: "40px", height: "40px" }}
  //                 >
  //                   <span className="text-white fw-bold small">{selectedConversationData?.freelancerAvatar}</span>
  //                 </div>
  //                 {selectedConversationData?.isOnline && (
  //                   <span
  //                     className="position-absolute bottom-0 end-0 bg-success rounded-circle border border-white"
  //                     style={{ width: "12px", height: "12px" }}
  //                   ></span>
  //                 )}
  //               </div>
  //               <div className="flex-grow-1">
  //                 <h6 className="mb-0">{selectedConversationData?.freelancerName}</h6>
  //                 <small className="text-muted">{selectedConversationData?.projectTitle}</small>
  //               </div>
  //               <div className="btn-group">
  //                 <button className="btn btn-outline-primary btn-sm">
  //                   <i className="bi bi-telephone"></i>
  //                 </button>
  //                 <button className="btn btn-outline-primary btn-sm">
  //                   <i className="bi bi-camera-video"></i>
  //                 </button>
  //                 <button className="btn btn-outline-primary btn-sm">
  //                   <i className="bi bi-three-dots"></i>
  //                 </button>
  //               </div>
  //             </div>
  //           </div>

  //           {/* Messages */}
  //           <div className="card-body flex-grow-1" style={{ overflowY: "auto", maxHeight: "400px" }}>
  //             {conversationMessages.map((message) => (
  //               <div
  //                 key={message.id}
  //                 className={`d-flex mb-3 ${message.sender === "client" ? "justify-content-end" : ""}`}
  //               >
  //                 <div className={`max-width-75 ${message.sender === "client" ? "order-2" : ""}`}>
  //                   <div
  //                     className={`p-3 rounded ${message.sender === "client" ? "bg-primary text-white" : "bg-light"}`}
  //                   >
  //                     <p className="mb-0">{message.message}</p>
  //                   </div>
  //                   <small className={`text-muted d-block mt-1 ${message.sender === "client" ? "text-end" : ""}`}>
  //                     {message.timestamp}
  //                   </small>
  //                 </div>
  //               </div>
  //             ))}
  //           </div>

  //           {/* Message Input */}
  //           <div className="card-footer bg-white">
  //             <form onSubmit={handleSendMessage}>
  //               <div className="input-group">
  //                 <button type="button" className="btn btn-outline-secondary">
  //                   <i className="bi bi-paperclip"></i>
  //                 </button>
  //                 <input
  //                   type="text"
  //                   className="form-control"
  //                   placeholder="Type your message..."
  //                   value={newMessage}
  //                   onChange={(e) => setNewMessage(e.target.value)}
  //                 />
  //                 <button type="submit" className="btn btn-primary">
  //                   <i className="bi bi-send"></i>
  //                 </button>
  //               </div>
  //             </form>
  //           </div>
  //         </div>
  //       </div>
  //     </div>
  //   </div>
  // )
}

export default MessagesCenter
