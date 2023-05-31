import axios from "axios";
import React, { useEffect, useState } from "react";

//Chart.js imports
import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js/auto";
import { Data } from "./ChartData/Data";
import BarChart from "./Charts/BarChart";
import { Box, Typography, Grid, Card, CardContent } from "@mui/material";
import DashBoardCard from "./DBComponents/DashBoardCard";
import CircularPercent from "./DBComponents/CircularPercent";

function Dashboard(props) {
  const [totalContactsInfo, setTotalContactsInfo] = useState("");
  const [clientPerUser, setClientPerUser] = useState("");
  const [chartData, setChartData] = useState("");

  useEffect(() => {
    if (clientPerUser) {
      setChartData({
        labels: clientPerUser.map((data) => data.username),
        datasets: [
          {
            label: "Clients Per User ",
            data: clientPerUser.map((data) => data.Contacts.length),
            backgroundColor: [
              "rgba(75,192,192,1)",
              "&quot;#ecf0f1",
              "#50AF95",
              "#f3ba2f",
              "#2a71d0",
            ],
            borderColor: "black",
            borderWidth: 2,
          },
        ],
      });
    }
  }, [clientPerUser]);

  useEffect(() => {
    async function getDashBoardInfo() {
      try {
        const dashboardResp = await axios.get(
          `http://localhost:8000/dashboard/${props.UserID}`,
          {
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
          }
        );
        console.log(dashboardResp);
        setTotalContactsInfo(dashboardResp.data.groupContacts);
        setClientPerUser(dashboardResp.data.userByGroupID);
      } catch (error) {
        console.log(error);
      }
    }
    getDashBoardInfo();
  }, []);
  let totalContacts = [];

  if (totalContactsInfo[0]) {
    totalContacts.push(totalContactsInfo[0]["Contacts"]);
  }

  //Showing the clients that each Users has
  let nameToClients = [];
  if (clientPerUser) {
    for (let i = 0; i < clientPerUser.length; i++) {
      nameToClients.push(
        <div>
          <p>Username:{clientPerUser[i].username}</p>
          <p>Clients:{clientPerUser[i].Contacts.length}</p>
        </div>
      );
    }
  }
  let BarChartRender;
  if (chartData) {
    BarChartRender = (
      <BarChart chartData={chartData} headerInfo={"Client Per User "} />
    );
  }

  return (
    <Grid
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justifyContent="center"
      sx={{ minHeight: "100vh", mt: 10 }}
    >
      <Typography variant="h3" gutterBottom>
        Dashboard
      </Typography>

      {/* Placeholder Dashboard Content */}
      <Box className="cardRowTop" sx={{ display: "flex", mt: 10 }}>
        <DashBoardCard
          cardTitle="New Accounts"
          cardStat="153"
          cardPercent="58"
        ></DashBoardCard>
        <DashBoardCard
          cardTitle="Total Expenses"
          cardStat="250"
          cardPercent="62"
        ></DashBoardCard>
        <DashBoardCard
          cardTitle="Company Value"
          cardStat="1,45"
          cardPercent="72"
        ></DashBoardCard>
        <DashBoardCard
          cardTitle="New Employees"
          cardStat="+34"
          cardPercent="81"
        ></DashBoardCard>
      </Box>
      <Box className="middleChartRow" sx={{ display: "flex", mt: 10 }}>
        <Card variant="outlined" sx={{ boxShadow: 1, mr: 10 }}>
          <CardContent>
            <Typography variant="h5" gutterBottom>
              Sales Total By Sales Rep
            </Typography>
            <div
              class="chart-container"
              style={{ height: "400px", width: "700px" }}
            >
              {BarChartRender}
            </div>
          </CardContent>
        </Card>
        <CircularPercent title="Income" percent="75"></CircularPercent>
      </Box>
      <Box className="cardRowBottom" sx={{ display: "flex", mt: 10 }}>
        <DashBoardCard
          cardTitle="Income"
          cardStat="153"
          cardPercent="58"
        ></DashBoardCard>
        <DashBoardCard
          cardTitle="Expenses"
          cardStat="250"
          cardPercent="62"
        ></DashBoardCard>
        <DashBoardCard
          cardTitle="Spending"
          cardStat="1,45"
          cardPercent="72"
        ></DashBoardCard>
        <DashBoardCard
          cardTitle="Totals"
          cardStat="+34"
          cardPercent="81"
        ></DashBoardCard>
      </Box>
    </Grid>
  );
}

export default Dashboard;

//group aggregates from salesgroup
// salesgroup contains a reference of Users which contains a reference of contacts

//  Users: [
// [0]     {
// [0]       Groups: [],
// [0]       _id: new ObjectId("643f460efab971148bdb9f03"),
// [0]       Email: 'ttt@gmail.com',
// [0]       Contacts: [],
// [0]       username: 'ttt',
// [0]       __v: 0
// [0]     },
// [0]     {
// [0]       Groups: [],
// [0]       _id: new ObjectId("643f4c254f3bb4040f316f91"),
// [0]       Email: 'gary@gmail.com',
// [0]       Contacts: [],
// [0]       username: 'gary',
// [0]       __v: 0
// [0]     }
// [0]   ]

// Instead of aggregating in group, I will aggregate in the Client list based on group Id that is created with the
