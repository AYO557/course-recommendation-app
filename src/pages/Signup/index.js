import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Textfield from "../../Component/Textfield";
import Button from "../../Component/Button";

const SignupPage = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [conPassword, setConPassword] = useState("");
  const [passwordNotMatch, setPasswordNotMatch] = useState(false);
  const [userExist, setUserExistState] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (passwordNotMatch) {
      const timer = setTimeout(() => {
        setPasswordNotMatch(false);
      }, 2000);
      return () => clearTimeout(timer);
    }

    if (userExist) {
      const timer = setTimeout(() => {
        setUserExistState(false);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [passwordNotMatch, userExist]);

  const handleSignup = (e) => {
    e.preventDefault();

    if (password !== conPassword) {
      setPasswordNotMatch(true);
      return;
    }

    const userData = {
      firstName,
      lastName,
      email,
      password,
    };

    let existingUsers = JSON.parse(localStorage.getItem("Users")) || [];
    if (!Array.isArray(existingUsers)) {
      existingUsers = [];
    }

    const userAlreadyExists = existingUsers.some(
      (user) => user.email === userData.email
    );

    if (userAlreadyExists) {
      setUserExistState(true);
    } else {
      existingUsers.push(userData);
      localStorage.setItem("Users", JSON.stringify(existingUsers));
      navigate("/app");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="p-8 rounded shadow-md w-80 sm:w-[80%] bg-white">
        <h2 className="text-2xl font-semibold mb-4">CREATE ACCOUNT</h2>
        {passwordNotMatch && (
          <small className="text-red-500 font-semibold uppercase">
            Passwords do not match
          </small>
        )}
        {userExist && (
          <small className="text-red-500 font-semibold uppercase">
            An account with email address {email} already exists
          </small>
        )}
        <form onSubmit={handleSignup} className="flex flex-col gap-2">
          <div className="flex justify-between gap-2">
            <Textfield
              label="First Name"
              onChange={(e) => setFirstName(e.target.value)}
              type="text"
              value={firstName}
            />
            <Textfield
              label="Last Name"
              onChange={(e) => setLastName(e.target.value)}
              type="text"
              value={lastName}
            />
          </div>
          <Textfield
            label="Email"
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            value={email}
          />
          <Textfield
            label="Password"
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            value={password}
          />
          <Textfield
            label="Confirm Password"
            onChange={(e) => setConPassword(e.target.value)}
            type="password"
            value={conPassword}
          />
          <Button size="medium">Sign Up</Button>
        </form>
        <div className="mt-4 text-center">
          <p className="text-gray-600">
            Already have an account?{" "}
            <Link to="/auth" className="text-green-500 hover:underline">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
