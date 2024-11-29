import React from "react";

const TicketCard = ({ ticket }) => {
  const priorityLabels = ["No Priority", "Low", "Medium", "High", "Urgent"];

  return (
    <div className="ticket-card">
      <h3>{ticket.title}</h3>
      <p>
        <strong>Status:</strong> {ticket.status}
      </p>
      <p>
        <strong>Priority:</strong> {priorityLabels[ticket.priority]}
      </p>
      <p>
        <strong>User:</strong> {ticket.userId}
      </p>
    </div>
  );
};

export default TicketCard;
