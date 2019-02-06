import React from "react";
import { Link, navigate } from "gatsby";
import { getUser, isLoggedIn, logout } from "../services/auth";

export default () => {
  // Show logged-in status of user.
  const content = { message: "", login: true };
  if (isLoggedIn()) {
    content.message = `Hello, ${getUser().username}`;
  } else {
    content.message = "You are not logged in";
  }

  return (
    <div
      style={{
        display: "flex",
        flex: "1",
        justifyContent: "space-between",
        borderBottom: "1px solid #d1c1e0"
      }}
    >
      <span>{content.message}</span>

      <nav>
        <Link to="/">Home</Link>
        {` `}
        <Link to="/app/profile">Profile</Link>
        {` `}
        {isLoggedIn() ? (
          <a
            href="/"
            onClick={event => {
              event.preventDefault();
              logout(() => navigate(`/`));
            }}
          >
            Logout
          </a>
        ) : null}
      </nav>
    </div>
  );
};
