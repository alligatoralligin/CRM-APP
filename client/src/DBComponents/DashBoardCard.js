import React from "react";

import { Box, Typography, Grid, Card, CardContent } from "@mui/material";
import CircularStatic from "./CircularProgress";
import CircularProgressWithLabel from "./CircularProgress";

function DashBoardCard(props) {
  return (
    <div>
      <Card
        variant="outlined"
        sx={{
          boxShadow: 1,
          minWidth: 350,
          minHeight: 110,
          ml: 10,
          borderRadius: "10px",
          ":hover": {
            boxShadow: 10,
          },
        }}
      >
        <CardContent>
          {/* <CircularProgressWithLabel value={props.cardPercent} /> */}
          <Grid container>
            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom sx={{ mb: 2 }}>
                {props.cardTitle}
              </Typography>
            </Grid>
            <Grid item xs={8} minHeight={50}>
              <Grid
                container
                spacing={0}
                direction="column"
                alignItems="center"
                justifyContent="center"
              >
                <Grid item xs={4}>
                  <Box component="img" src={props.icon}></Box>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={4}>
              <Grid
                container
                spacing={0}
                direction="column"
                alignItems="center"
                justifyContent="center"
              >
                <Typography sx={{ mt: 1.7 }} variant="subtitle1">
                  {props.cardStat}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
      <br></br>
    </div>
  );
}

export default DashBoardCard;
