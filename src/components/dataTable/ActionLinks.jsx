import React from "react";
import { Link } from "react-router-dom";

const ActionLinks = ({ actions, item }) => (
  <div className="flex items-center justify-center gap-2">
    {actions.map(({ icon, link, className }, index) => (
      <span key={index}>
        {typeof icon === "function" ? (
          icon(item)
        ) : (
          <Link to={link(item.id)} className={`text-lg ${className}`}>
            {icon}
          </Link>
        )}
      </span>
    ))}
  </div>
);

export default ActionLinks;
