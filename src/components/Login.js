import React, { useEffect } from "react";
import firebase from "../firebase";
import { useNavigate } from "react-router-dom";
import "./login.css";
import Button from "@mui/material/Button";
import { Typography } from "@mui/material";

const Login = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuthState = () => {
      firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          console.log("User is logged in.");
          navigate("/dashboard"); // Redirect to the dashboard
        } else {
          console.log("User is logged out.");
          navigate("/"); // Redirect to the login page
        }
      });
    };

    checkAuthState();
  }, []);

  const handleLogin = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithRedirect(provider);
  };

  return (
    <div className="head">
      <div className="page">
        <Typography variant="h2" component="h2">
          Welcome to Stock Dashboard
        </Typography>

        <Button
          sx={{ marginTop: "10px" }}
          onClick={handleLogin}
          variant="contained"
          disableElevation
        >
          Sign in with Google
        </Button>
      </div>
    </div>
  );
};

export default Login;
