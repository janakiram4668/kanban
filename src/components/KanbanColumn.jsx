import React from "react";

// Import the identical SVG images
import additionalIcon from "../assests/add.svg";
import dotIcon from "../assests/threedot.svg";

// Import specific SVG icons for each status
import todoIcon from "../assests/todo.svg";
import inProgressIcon from "../assests/inprogress.svg";
import backlogIcon from "../assests/backlog.svg";

// Import the grey SVG image for tags
import greyIcon from "../assests/grey.svg"; // Import the grey icon

// Function to determine the icon based on the ticket's status
const getStatusIcon = (status) => {
  switch (status.toLowerCase()) {
    case "todo":
      return todoIcon;
    case "in progress":
      return inProgressIcon;
    case "backlog":
      return backlogIcon;
    default:
      return null; // No icon for unrecognized statuses
  }
};

// Function to determine the color class based on the status
const getStatusClass = (status) => {
  switch (status.toLowerCase()) {
    case "todo":
      return "todo"; // Applies the "todo" status color
    case "in progress":
      return "in-progress"; // Applies the "in-progress" status color
    case "backlog":
      return "backlog"; // Applies the "backlog" status color
    default:
      return ""; // Default for unknown statuses
  }
};

// Function to determine priority color class
const getPriorityClass = (priority) => {
  switch (priority) {
    case 0:
      return "low"; // Low priority
    case 1:
      return "medium"; // Medium priority
    case 2:
      return "high"; // High priority
    case 3:
      return "urgent"; // Urgent priority
    default:
      return "";
  }
};

const KanbanColumn = ({ title, tickets, icon }) => {
  return (
    <div className="kanban-column">
      {/* Column Header */}
      <div className="column-header">
        {icon && <img src={icon} alt={`${title} Icon`} className="column-icon" />}
        <h2>{title}</h2>

        {/* Additional icons */}
        <div className="additional-icons">
          <img src={additionalIcon} alt="Additional Icon" className="additional-icon" />
          <img src={dotIcon} alt="dot Icon" className="additional-icon" />
        </div>
      </div>

      {/* Column Content */}
      <div className="column-content">
        {tickets.map((ticket) => {
          const statusIcon = getStatusIcon(ticket.status); // Get the status-based icon
          const statusClass = getStatusClass(ticket.status); // Get status-based class
          const priorityClass = getPriorityClass(ticket.priority); // Get priority-based class

          // Combine both the status and priority class for styling
          const ticketClass = `${statusClass} ${priorityClass}`;

          return (
            <div key={ticket.id} className={`ticket ${ticketClass}`}>
              {/* Header: Display Ticket ID */}
              <div className="ticket-header">
                <strong>{ticket.id}</strong>
              </div>

              {/* Body: Status Icon and Title in one line */}
              <div style={{ display: "flex", alignItems: "center" }}>
                {statusIcon && <img src={statusIcon} alt={`${ticket.status} Icon`} className="status-icon" />}
                <span style={{ marginLeft: "8px" }}>{ticket.title}</span>
              </div>

              {/* Footer: Display Tags with grey icon, converted to lowercase */}
              {ticket.tag && ticket.tag.length > 0 && (
                <div className="ticket-footer" style={{ marginTop: "10px", fontSize: "14px", color: "#666", display: "flex", alignItems: "center" }}>
                  {/* Grey Icon before the tag */}
                  <img src={greyIcon} alt="Grey Icon" style={{ width: "16px", height: "16px", marginRight: "8px" }} />
                  <div className="feature-required-card">
                    <strong>{ticket.tag[0].toLowerCase()}</strong> {/* Convert to lowercase */}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default KanbanColumn;
