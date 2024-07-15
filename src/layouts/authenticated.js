import React, { useEffect } from "react";
import { useNavigate } from "react-router";

// # This layout will always bring none registered user to the login page by default
export default function Authenticated() {
  const user = localStorage.getItem("user");

  const navigate = useNavigate();

  console.log(user);

  useEffect(() => {
    if (!user) {
      navigate("/auth");
    }
  }, []);

  // # The Home page should be rendered here;
  return (
    <div>
      <h1>authenticated</h1>
    </div>
  );
}
