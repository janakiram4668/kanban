import priorityIcon from "../assests/Prioritycolour.svg";
import React, { useState, useEffect } from "react";
import KanbanColumn from "./KanbanColumn";
import Header from "./Header";

// Import icons for priority grouping
import highIcon from "../assests/High.svg";
import mediumIcon from "../assests/Medium.svg";
import lowIcon from "../assests/Low.svg";
import noPriorityIcon from "../assests/threedot.svg";

const API_URL = "https://api.quicksell.co/v1/internal/frontend-assignment";

const KanbanBoard = () => {
  const [tickets, setTickets] = useState([]);
  const [users, setUsers] = useState([]);
  const [grouping, setGrouping] = useState("status");
  const [sortOption, setSortOption] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    fetch(API_URL)
      .then((response) => response.json())
      .then((data) => {
        setTickets(data.tickets);
        setUsers(data.users);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  // Group tickets based on the selected grouping type
  const groupedTickets = () => {
    if (grouping === "status") {
      return tickets.reduce((acc, ticket) => {
        acc[ticket.status] = acc[ticket.status] || { tickets: [], icon: null };
        acc[ticket.status].tickets.push(ticket);
        return acc;
      }, {});
    } else if (grouping === "user") {
      return tickets.reduce((acc, ticket) => {
        const user = users.find((u) => u.id === ticket.userId)?.name || "Unassigned";
        acc[user] = acc[user] || { tickets: [], icon: null };
        acc[user].tickets.push(ticket);
        return acc;
      }, {});
    } else if (grouping === "priority") {
      const priorityLabels = ["No Priority", "Low", "Medium", "High", "Urgent"];
      const priorityIcons = {
        "No Priority": noPriorityIcon,
        Low: lowIcon,
        Medium: mediumIcon,
        High: highIcon,
        Urgent: priorityIcon,
      };

      return tickets.reduce((acc, ticket) => {
        const priority = priorityLabels[ticket.priority];
        acc[priority] = acc[priority] || { tickets: [], icon: priorityIcons[priority] };
        acc[priority].tickets.push(ticket);
        return acc;
      }, {});
    }
    return {};
  };

  // Sort tickets if sorting is applied
  const sortedTickets = (tickets) => {
    if (sortOption === "priority") {
      return tickets.sort((a, b) => b.priority - a.priority);
    } else if (sortOption === "title") {
      return tickets.sort((a, b) => a.title.localeCompare(b.title));
    }
    return tickets;
  };

  const groups = groupedTickets();

  return (
    <div>
      {/* Header Component */}
      <Header onToggleDropdown={() => setShowDropdown((prev) => !prev)} />

      {/* Dropdown Menu */}
      {showDropdown && (
        <div className="dropdown">
          <div className="dropdown-card">
            {/* Grouping Dropdown Card */}
            <div className="dropdown-item">
              <label>Grouping:</label>
              <select
                className="dropdown-select"
                onChange={(e) => setGrouping(e.target.value)}
              >
                <option value="status">Status</option>
                <option value="user">User</option>
                <option value="priority">Priority</option>
              </select>
            </div>

            {/* Ordering Dropdown Card */}
            <div className="dropdown-item">
              <label>Ordering:</label>
              <select
                className="dropdown-select"
                onChange={(e) => setSortOption(e.target.value)}
              >
                <option value="">None</option>
                <option value="priority">Priority</option>
                <option value="title">Title</option>
              </select>
            </div>
          </div>
        </div>
      )}

      {/* Kanban Board */}
      <div className="kanban-board">
        {Object.keys(groups).map((group) => (
          <KanbanColumn
            key={group}
            title={group}
            tickets={sortedTickets(groups[group].tickets)}
            icon={groups[group].icon} // Pass the icon to each column
          />
        ))}
      </div>
    </div>
  );
};

export default KanbanBoard;
