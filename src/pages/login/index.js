import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Textfield from "../../Component/Textfield";
import { useNavigate } from "react-router-dom";
import Button from "../../Component/Button";

// # LocalStorage have been used to improvise authentication here ahead of endpoint delivery.

const LoginPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isBtnDisabled, setIsBtnDisabled] = useState(true);

  // # enable button.
  useEffect(() => {
    email && password ? setIsBtnDisabled(false) : setIsBtnDisabled(true);
  }, [email, password]);

  const handleLogin = (e) => {
    e.preventDefault();
    // const formData = {
    //   email,
    //   password,
    // };
    const checkData = JSON.parse(localStorage.getItem("Users"));
    console.log(checkData);
    if (checkData) {
      const user = checkData.find((user) => user.email === email);
      if (user && user.password === password) {
        localStorage.setItem("Users", JSON.stringify(user));
        navigate("/app");
      } else {
        alert("Invalid email or password");
      }
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="bg-white p-8 rounded shadow-md w-[80%] h-[70vh] ">
        <h2 className="text-5xl text-green-500 font-semibold mb-6">
          CAREER PATH
        </h2>
        {/* form  */}
        <form onSubmit={handleLogin}>
          <Textfield
            label={"Email"}
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            type={"email"}
          />
          <Textfield
            label={"Password"}
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            type={"password"}
          />

          <Button isDisabled={isBtnDisabled}>login</Button>
        </form>
        <div className="mt-4 text-center">
          <Link
            to="/auth/reset-password"
            className="text-green-500 hover:underline"
          >
            Forgot password?
          </Link>
        </div>
        <div className="mt-2 text-center">
          <p>
            Don't have an account?{" "}
            <Link to="/auth/signup" className="text-green-500 hover:underline">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
