import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Spinner = () => {
  const [count, setCount] = useState(5);
  const navigate = useNavigate();

  useEffect(() => {
    const internal = setInterval(() => {
      setCount((preValue) => --preValue);
    }, 1000);
    count === 0 && navigate("/login");
    return () => clearInterval(internal);
  }, [count, navigate]);
  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{ height: "70vh" }}
    >
      <h1 className="Text-center"> Redirecting to you in {count} </h1>
      <div className="spinner-border" role="status">
        <span className="sr-only"></span>
      </div>
    </div>
  );
};

export default Spinner;
