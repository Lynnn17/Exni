import React from "react";
import { Link } from "react-router-dom";

const ActionLinks = ({ actions, itemId }) => (
  <div className="flex items-center justify-center gap-2">
    {actions.map((action, index) => (
      <Link
        key={index}
        to={action.link(itemId)}
        className={`text-lg ${action.className}`}
      >
        {action.icon}
      </Link>
    ))}
  </div>
);

export default ActionLinks;
