import { useState, useEffect } from "react";
import { useAuth } from "../../context/auth";
import { Outlet } from "react-router-dom";
import axios from "axios";
import Spinner from "../Spinner";

// Outlet is for Routing purpose
export default function PrivateRoute() {
  const [message, setMessage] = useState(false);
  const [auth, setAuth] = useAuth();
  console.log("somehitgn");
  useEffect(() => {
    const authCheck = async () => {
      const res = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/auth/auth-route`,
        {
          headers: {
            Authorization: auth?.token,
          },
        }
      );
      console.log("res", res);
      if (res.data.success) {
        setMessage(true);
      } else {
        setMessage(false);
      }
    };
    if (auth?.token) authCheck();
  }, [auth?.token]);
  return message ? <Outlet /> : <Spinner />;
}
