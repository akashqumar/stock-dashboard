// src/components/Dashboard.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import firebase from "../firebase";
import { useNavigate } from "react-router-dom";
import "./dashboard.css";
import Loader from "./Loader";
import CustomizedTables from "./Table";
import { Button, Typography } from "@mui/material";

const Dashboard = () => {
  const [stockData, setStockData] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    fetchStockData();
  }, []);

  useEffect(() => {
    const checkAuthState = () => {
      firebase.auth().onAuthStateChanged((user) => {
        if (!user) {
          console.log("Please log in then try again.");
          navigate("/"); // Redirect to the dashboard
        }
      });
    };

    checkAuthState();
  }, []);

  const fetchStockData = async () => {
    try {
      const response = await axios.get(
        "https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=IBM&interval=5min&apikey=U0HYFCTX11GVDI2H"
      );

      // Parse the response and extract the stock data
      const stockData = response.data;
      const timeSeriesData = stockData["Time Series (5min)"];

      // Convert the stock data into an array for easier mapping and display
      const stockArray = Object.keys(timeSeriesData).map((date) => {
        return {
          date,
          open: timeSeriesData[date]["1. open"],
          high: timeSeriesData[date]["2. high"],
          low: timeSeriesData[date]["3. low"],
          volume: timeSeriesData[date]["5. volume"],
          price: timeSeriesData[date]["4. close"],
        };
      });

      setStockData(stockArray);
      // console.log(stockArray);
    } catch (error) {
      console.log("Error fetching stock data:", error);
    }
  };

  if (!stockData.length) {
    return <Loader />;
  }

  const handleLogout = () => {
    firebase.auth().signOut();
    navigate("/");
  };

  return (
    <div className="container">
      <div className="header">
        <Typography variant="h3" style={{ padding: "10px" }}>
          Stock Dashboard
        </Typography>
        <Button
          sx={{ margin: "21px" }}
          onClick={handleLogout}
          variant="contained"
          disableElevation
        >
          Logout
        </Button>
      </div>
      <div className="left">
        <CustomizedTables stockData={stockData} />
      </div>
    </div>
  );
};

export default Dashboard;
