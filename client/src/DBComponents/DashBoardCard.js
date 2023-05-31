import React from "react";

import { Box, Typography, Grid, Card, CardContent } from "@mui/material";
import CircularStatic from "./CircularProgress";
import CircularProgressWithLabel from "./CircularProgress";

function DashBoardCard(props) {
  return (
    <div>
      <Card
        variant="outlined"
        sx={{ boxShadow: 1, minWidth: 350, minHeight: 110, ml: 10 }}
      >
        <CardContent>
          <CircularProgressWithLabel value={props.cardPercent} />
          <Typography variant="h6" gutterBottom sx={{ mb: 2 }}>
            {props.cardTitle}
          </Typography>
          <Typography variant="subtitle1">{props.cardStat}</Typography>
        </CardContent>
      </Card>
      <br></br>
    </div>
  );
}

export default DashBoardCard;
