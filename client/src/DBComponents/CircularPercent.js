import React from "react";

import { Box, Typography, Grid, Card, CardContent } from "@mui/material";
import CircularStatic from "./CircularProgress";
import CircularProgressWithLabel from "./CircularProgress";

export default function CircularPercent(props) {
  return (
    <Card
      variant="outlined"
      sx={{ boxShadow: 1, minWidth: 350, minHeight: 110, ml: 10 }}
    >
      <CardContent>
        <Typography variant="subtitle1" gutterBottom sx={{ mb: 2 }}>
          {props.title}
        </Typography>
        <CircularProgressWithLabel value={props.percent} size="15rem" />
      </CardContent>
    </Card>
  );
}
