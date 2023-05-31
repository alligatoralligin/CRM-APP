import React from "react";
import Button from "@mui/material/Button";
import { Grid } from "@mui/material";

export default function HomePage() {
  return (
    <Grid container mt={10} ml={10}>
      <h1>Hello from HomePage</h1>
      <Button variant="contained">Hello World</Button>
    </Grid>
  );
}
